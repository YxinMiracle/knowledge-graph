import datetime
from QuestionSpider.settings import SQL_DATETIME_FORMAT

def type_re(value):
    try:
        return value[0]
    except:
        return "None"

def re_format_time(value):
    return value.strftime(SQL_DATETIME_FORMAT)