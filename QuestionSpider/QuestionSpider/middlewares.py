# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html
import time

from scrapy import signals

# useful for handling different item types with a single interface
from itemadapter import is_item, ItemAdapter
from selenium import webdriver
from scrapy.http import HtmlResponse

class QuestionspiderSpiderMiddleware:
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the spider middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        # Called for each response that goes through the spider
        # middleware and into the spider.

        # Should return None or raise an exception.
        return None

    def process_spider_output(self, response, result, spider):
        # Called with the results returned from the Spider, after
        # it has processed the response.

        # Must return an iterable of Request, or item objects.
        for i in result:
            yield i

    def process_spider_exception(self, response, exception, spider):
        # Called when a spider or process_spider_input() method
        # (from other spider middleware) raises an exception.

        # Should return either None or an iterable of Request or item objects.
        pass

    def process_start_requests(self, start_requests, spider):
        # Called with the start requests of the spider, and works
        # similarly to the process_spider_output() method, except
        # that it doesn’t have a response associated.

        # Must return only requests (not items).
        for r in start_requests:
            yield r

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)


class QuestionspiderDownloaderMiddleware:

    def process_response(self, request, response, spider):
        if request.url == "https://www.zhihu.com/search?type=content&q=python":
            from selenium.webdriver.chrome.options import Options
            chrome_option = Options()
            chrome_option.add_argument("--disable-extensions")
            chrome_option.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
            bro = webdriver.Chrome(executable_path='D:/chromeDriver/cd/chromedriver.exe',chrome_options=chrome_option)
            bro.get(request.url)
            js = 'window.scrollTo(0,document.body.scrollHeight)'
            for i in range(1, 15):
                bro.execute_script(js)
                time.sleep(1)
            page_text = bro.page_source
            new_response = HtmlResponse(url=request.url, body=page_text, encoding="utf-8", request=request)
            return new_response
        else:
            return response
