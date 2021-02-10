# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html
import datetime

import scrapy
from w3lib.html import remove_tags
from scrapy.loader.processors import MapCompose, Join

from QuestionSpider.settings import SQL_DATETIME_FORMAT
from QuestionSpider.tools.crawls_tools import extract_num

class ZhihuAnswerItem(scrapy.Item):
    # 知乎的问题回答item
    zhihu_id = scrapy.Field()
    url = scrapy.Field()
    question_id = scrapy.Field()
    author_id = scrapy.Field()
    content = scrapy.Field()
    praise_num = scrapy.Field()
    comments_num = scrapy.Field()
    create_time = scrapy.Field()
    update_time = scrapy.Field()
    crawl_time = scrapy.Field()

    def get_insert_sql(self):
        # 插入知乎question表的sql语句
        insert_sql = """
            insert into zhihu_answer(zhihu_id, url, question_id, author_id, content, praise_num, comments_num,
              create_time, update_time, crawl_time
              ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
              ON DUPLICATE KEY UPDATE content=VALUES(content), comments_num=VALUES(comments_num), praise_num=VALUES(praise_num),
              update_time=VALUES(update_time)
        """

        create_time = datetime.datetime.fromtimestamp(self["create_time"]).strftime(SQL_DATETIME_FORMAT)
        update_time = datetime.datetime.fromtimestamp(self["update_time"]).strftime(SQL_DATETIME_FORMAT)
        params = (
            self["zhihu_id"], self["url"], self["question_id"],
            self["author_id"], self["content"], self["praise_num"],
            self["comments_num"], create_time, update_time,
            self["crawl_time"].strftime(SQL_DATETIME_FORMAT),
        )

        return insert_sql, params


class ZhihuQuestionItem(scrapy.Item):
    # 知乎的问题 item
    zhihu_id = scrapy.Field()
    topics = scrapy.Field()
    url = scrapy.Field()
    title = scrapy.Field()
    content = scrapy.Field()
    answer_num = scrapy.Field()
    comments_num = scrapy.Field()
    watch_user_num = scrapy.Field()
    click_num = scrapy.Field()
    crawl_time = scrapy.Field()

    def get_insert_sql(self):
        # 插入知乎question表的sql语句
        insert_sql = """
            insert into zhihu_question(zhihu_id, topics, url, title, content, answer_num, comments_num,
              watch_user_num, click_num, crawl_time
              )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE content=VALUES(content), answer_num=VALUES(answer_num), comments_num=VALUES(comments_num),
              watch_user_num=VALUES(watch_user_num), click_num=VALUES(click_num)
        """
        zhihu_id = self["zhihu_id"][0]
        topics = ",".join(self["topics"])
        url = self["url"][0]
        title = "".join(self["title"])
        if len(self["content"]) == 0:
            content = ""
        else:
            content = "".join(self["content"])
        answer_num = extract_num("".join(self["answer_num"]))
        comments_num = extract_num("".join(self["comments_num"]))

        watch_user_num = self["watch_user_num"][0]
        click_num = 0

        crawl_time = datetime.datetime.now().strftime(SQL_DATETIME_FORMAT)

        params = (zhihu_id, topics, url, title, content, answer_num, comments_num,
                  watch_user_num, click_num, crawl_time)

        return insert_sql, params


class QuestionspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()  # 问题的题目
    title_md5 = scrapy.Field()  # 问题的题目
    href = scrapy.Field()  # 问题的详情链接
    describe = scrapy.Field()  # 问题的表述
    source = scrapy.Field()  # 问题的来源
    question_type = scrapy.Field()  # 该题目从那里
    crawl_time = scrapy.Field()  # 问题的爬取时间
    update_time = scrapy.Field()  # 问题的爬取的更新时间

    def get_insert_sql(self):
        # 插入知乎question表的sql语句
        insert_sql = """
            insert into baidu(title, title_md5, href, describe_q, source, question_type, crawl_time,
              update_time) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
              ON DUPLICATE KEY UPDATE describe_q=VALUES(describe_q), source=VALUES(source), crawl_time=VALUES(crawl_time),
              update_time=VALUES(update_time)
        """

        update_time = datetime.datetime.now().strftime(SQL_DATETIME_FORMAT)
        params = (
            self["title"], self["title_md5"], self["href"],
            self["describe"], self["source"], self["question_type"],
            self["crawl_time"], update_time,
        )

        return insert_sql, params
