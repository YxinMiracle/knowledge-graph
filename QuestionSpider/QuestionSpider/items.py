# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from w3lib.html import remove_tags
from scrapy.loader.processors import MapCompose,Join



class QuestionspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title_list = scrapy.Field()
    href = scrapy.Field()
    describe = scrapy.Field()
    source = scrapy.Field()
