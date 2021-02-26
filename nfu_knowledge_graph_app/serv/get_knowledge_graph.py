from flask import Blueprint, request, jsonify
import uuid
import os
from w3lib.html import remove_tags

from setting import RET, PIC_PATH
from utils.baiduai import get_text
from utils.es_search_tools import get_question_and_tags, get_ans
from utils.neo4j_search_tools import get_question_n, get_query

get_knowledge_graph = Blueprint("get_knowledge_graph", __name__)


@get_knowledge_graph.route("/app_explain", methods=["POST"])
def app_explain():
    question_dict = request.form.to_dict()
    question_n = question_dict.get("explain_n")
    desc, query, tag_list = get_question_n(question_n)
    RET["code"] = 0
    RET["msg"] = "获取数据成功"
    RET['data'] = {"desc": desc, "query": query, "tag_list": tag_list}
    print(RET)
    return jsonify(RET)


@get_knowledge_graph.route("/uploader", methods=["POST"])
def uploader():
    my_p = request.files.get("jpg")
    pic_name = f"{uuid.uuid4()}.jpg"
    pic_path = os.path.join(PIC_PATH, pic_name)
    my_p.save(pic_path)
    question = get_text(pic_path)
    if question:
        result_list, tags_list = get_question_and_tags(question)
        result_list = result_list["hits"]["hits"]
        query = get_query(result_list)
        print(result_list, query)

        RET["code"] = 0
        RET["msg"] = "获取答案成功"
        RET["data"] = {"result_list":result_list,"query":query}
        print(RET)
        return jsonify(RET)

@get_knowledge_graph.route("/app_getAns",methods=["POST"])
def app_getAns():
    question_dict = request.form.to_dict()
    question = question_dict.get("question")
    if question:
        result_list, tags_list = get_question_and_tags(question)
        result_list = result_list["hits"]["hits"]
        query = get_query(result_list)
        print(result_list, query)

        RET["code"] = 0
        RET["msg"] = "获取答案成功"
        RET["data"] = {"result_list":result_list,"query":query,"question":question}
        print(RET)
        return jsonify(RET)

@get_knowledge_graph.route("/getAns", methods=["POST"])
def getAns():
    question_dict = request.form.to_dict()
    question = remove_tags(question_dict.get("question[]"))
    print(question)
    ret_dict = get_ans(question)
    return jsonify(ret_dict)