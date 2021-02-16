import os
import time

import openpyxl
from py2neo import Graph, Node, NodeMatcher

from nfu_knwo_graph.settings import BASE_DIR
from utils.tools import get_md5
from elasticsearch import Elasticsearch
from elasticsearch import helpers


class Upload(object):
    """
    es中有两个索引，第一个是tags，用来存放提示词，还有一个是question，用来存放问题
    该类是用来老师创建数据使用的
    step1:先在neo4j中创建数据，然后创建节点中的联系
    step2:更新节点中有专业解释的名词，更新在desc属性中
    step3:添加问题
    step4:加入tags数据
    """

    def __init__(self, label, file_name):
        self.es = Elasticsearch(['127.0.0.1:9200'])
        self.g = Graph("http://localhost:7474", username="neo4j", password="newxin.001206")
        self.label = label
        self.create_node_sheet_name = "Sheet1"
        self.create_n_explain = "Sheet2"
        self.create_question = "Sheet3"
        self.wb = openpyxl.load_workbook(file_name)

    def findNode(self, name):
        matcher = NodeMatcher(self.g)
        m = matcher.match(self.label, name=name).first()  # 使用nodematcher找到节点
        return m

    def create_node(self):
        """
        该方法用来创建节点，记得在创建节点的时候，加入label属性
        :return:
        """
        sh = self.wb[self.create_node_sheet_name]
        rows_list = list(sh.rows)[1:]
        # 这个循环时将所有的节点加入到neo4j图数据库中
        for row in rows_list:
            matcher = NodeMatcher(self.g)
            name1 = row[0].value
            name2 = row[1].value
            if not matcher.match(self.label, name=name1).first():
                self.g.create(Node(self.label, name=name1, _id=get_md5(name1), label=self.label, desc=""))
            if not matcher.match(self.label, name=name2).first():
                self.g.create(Node(self.label, name=name2, _id=get_md5(name2), label=self.label, desc=""))

        # 这个是将Node建立起关系
        for row in rows_list:
            name1 = row[0].value
            name2 = row[1].value
            relationship_name = row[2].value
            _name1_md5 = get_md5(name1)
            _name2_md5 = get_md5(name2)
            query = "match(p:`%s`),(q:`%s`) where p._id='%s' and q._id='%s' create (p)-[r:%s]->(q)" % (
                self.label, self.label, _name1_md5, _name2_md5, relationship_name)
            self.g.run(query)
            # print("yes!")

    def set_n_explain(self):
        """
        更新节点属性（对专有名词的解释）
        :param create_node_explain_file_name:
        :return:
        """
        sh = self.wb[self.create_n_explain]
        rows_list = list(sh.rows)[1:]
        for row in rows_list:
            n = row[0].value  # 专有名词
            exp = row[1].value.replace("\n", " ")  # 对应的解释
            node = self.findNode(n)
            # print(node)
            node.update({"desc": exp})
            self.g.push(node)
            # print("成功插入：", n, exp)

    def set_question(self):
        """
        记得加上题目的解释
        :return:
        """
        sh = self.wb[self.create_question]
        rows_list = list(sh.rows)[1:]
        actions = []
        for row in rows_list:
            question = row[0].value
            A, B, C, D, ans = row[1].value, row[2].value, row[3].value, row[4].value, row[5].value
            tags = " ".join((row[6].value).split("/"))
            d = {
                "_index": "question",
                "_type": "doc",
                "_source": {
                    "question": question,
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                    "ans": ans,
                    "tags": tags,
                    "label": self.label
                }
            }
            actions.append(d)
        helpers.bulk(self.es, actions=actions)
        print("插入问题成功")

    # 得到所有的tags的name，并且加入到es的tags索引中
    def get_tags_name(self):
        query = "match (n) return n"
        nodes = self.g.run(query).data()
        actions = []
        for node in nodes:
            node_name = node.get('n').get("name")
            d = {
                "_index": "tags",
                "_type": "doc",
                "_source": {
                    "title": node_name
                }
            }
            actions.append(d)
        helpers.bulk(self.es, actions=actions)
        print("插入提示词语功能结束")

    def write_label(self):
        with open(os.path.join(BASE_DIR,"labels"), "a+", encoding="utf-8") as fp:
            write_str = self.label + ","
            fp.write(write_str)

    def run(self):
        self.create_node()
        self.set_n_explain()
        self.set_question()
        self.get_tags_name()
        self.write_label()

if __name__ == '__main__':
    with open("../labels", "a+", encoding="utf-8") as fp:
        write_str = "c语言" + ","
        print(write_str)
        fp.write(write_str)
