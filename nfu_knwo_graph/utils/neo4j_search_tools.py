import os

from py2neo import Graph

# 用在前端问题搜索后的知识图谱显示，该方法是整个项目的败笔
from nfu_knwo_graph.settings import BASE_DIR


def get_query(result_list):
    tags_list = set()
    for result in result_list:
        tags = result["_source"]["tags"].split(" ")
        for _tag in tags:
            tags_list.add(_tag)

    tags_list = list(tags_list)
    set_tags_list_str = str(tags_list)

    query = "match (n)-[r]-(p) where n.name in %s return n,r,p" % (set_tags_list_str)
    print(query)
    return query



def get_question_n(question_n):
    """
    该方法用来解释老师输入的专有名词
    :param question_n:
    :return: 将得到的字符串（答案）传回给前端
    """
    g = Graph("http://localhost:7474", username="neo4j", password="newxin.001206")
    query = "match (n) where n.name='%s' return n" % (question_n)
    desc = ""
    try:
        node = g.run(query).data()[0]
        desc = node.get('n').get("desc")
        print(">>>>>>>>>", desc)
    except IndexError as e:
        desc = "无这个名词的解释，已通知老师进行更新"

    ret_query = "match (n)-[r]->(p) where n.name='%s' return n,r,p" % (question_n)

    name_list = []
    # 将节点的名字放入一个列表中
    nodes = g.run(ret_query).data()
    for node in nodes:
        name = node.get('p').get("name")
        name_list.append(name)

    return desc, ret_query, name_list


def get_labels():
    """将数据库中的label放入list中返回"""
    with open(os.path.join(BASE_DIR, "labels"), encoding="utf-8") as fp:
        line = fp.readline()
    label_list = line.split(",")[:-1]
    return label_list


if __name__ == '__main__':
    get_labels()
