# 目录配置
import os

path = os.path.dirname(os.path.abspath(__file__))
COVER_PATH = os.path.join(path, "data", "cover")
MUSIC_PATH = os.path.join(path, "data", "music")
PIC_PATH = os.path.join(path,"data","pic")

# 数据库配置
from pymongo import MongoClient

MC = MongoClient()
MongoDB = MC["nfu_app"]

# Return 配置
RET = {"code": 0, "msg": "", "data": {}}

if __name__ == '__main__':
    print(COVER_PATH)
