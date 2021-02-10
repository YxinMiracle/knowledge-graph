# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from w3lib.html import remove_tags
from scrapy.loader.processors import MapCompose, Join


class QuestionspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()  # 问题的题目
    href = scrapy.Field()  # 问题的详情链接
    describe = scrapy.Field()  # 问题的表述
    source = scrapy.Field()  # 问题的来源
    question_type = scrapy.Field()  # 该题目从那里
    crawl_time = scrapy.Field()  # 问题的爬取时间
    update_time = scrapy.Field()  # 问题的爬取的更新时间
