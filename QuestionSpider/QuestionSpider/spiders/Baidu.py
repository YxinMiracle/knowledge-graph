import datetime

import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from QuestionSpider.items import QuestionspiderItem
from QuestionSpider.tools.crawls_tools import type_re,re_format_time

import re

class BaiduSpider(CrawlSpider):
    name = 'Baidu'
    # allowed_domains = ['www.xxx.com']
    start_urls = ['https://www.baidu.com/s?wd=python']

    question_rule = LinkExtractor(allow=r's\?wd=.*?')  # 问题的url
    page_rule = LinkExtractor(allow=r'pn=\d+')  # 页数

    rules = (
        Rule(question_rule, callback='parse_item', follow=True),
        Rule(page_rule, callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        div_list = response.xpath('//div[@id="content_left"]/div')
        for div in div_list:
            item = QuestionspiderItem()
            title_list = div.xpath('h3/a//text()').extract()  # 题目
            href = div.xpath('h3/a/@href').extract_first()  # a标签跳转链接
            describe_list = div.xpath('.//div[contains(@class,"c-abstract")]//text()').extract()  # 描述
            source = div.xpath('.//span[@class="Z_VPTC"]/text()').extract_first()  # 来源
            if href:
                question_type = type_re(re.findall("www.(.*?).com", href))
            else:
                question_type = "None"
            item["title"] = "".join(title_list).strip().replace("\n","")
            item["href"] = href
            item["describe"] = "".join(describe_list).strip().replace("\n","")
            item["source"] = source
            item["question_type"] = question_type
            item["crawl_time"] = re_format_time(datetime.datetime.now())
            yield item
        # return item
