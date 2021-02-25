import os

from flask import Blueprint, jsonify, send_file
from setting import MongoDB, RET, COVER_PATH, MUSIC_PATH

get_anythings = Blueprint("get_anythings", __name__)


@get_anythings.route("/get_content_list", methods=["POST"])
def get_content_list():
    content_list = list(MongoDB.contents.find({}).limit(20))

    for index, item in enumerate(content_list):
        content_list[index]["_id"] = str(item.get("_id"))

    RET["code"] = 0
    RET["msg"] = "获取内容列表成功"
    RET["data"] = content_list
    return jsonify(RET)


@get_anythings.route("/get_cover/<filename>")
def get_cover(filename):
    file_path = os.path.join(COVER_PATH, filename)
    return send_file(file_path)

@get_anythings.route("/get_music/<filename>")
def get_music(filename):
    file_path = os.path.join(MUSIC_PATH, filename)
    return send_file(file_path)
