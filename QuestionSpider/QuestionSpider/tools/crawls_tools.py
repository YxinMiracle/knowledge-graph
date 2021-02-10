import hashlib
import re
from QuestionSpider.settings import SQL_DATETIME_FORMAT


# 该函数返回的是列表中的第一个值
def type_re(value):
    try:
        return value[0]
    except:
        return "None"


# 将时间转成自己想要的格式
def re_format_time(value):
    return value.strftime(SQL_DATETIME_FORMAT)

# 返回value值的MD5加密形式
def get_md5(url):
    if isinstance(url, str):
        url = url.encode("utf-8")
    m = hashlib.md5()
    m.update(url)
    return m.hexdigest()

def extract_num(text):
    """
    从字符串中提取出数字
    :param text:
    :return:
    """
    match_re = re.match(".*?(\d+).*", text)
    if match_re:
        num = int(match_re.group(1))
    else:
        num = 0
    return num
