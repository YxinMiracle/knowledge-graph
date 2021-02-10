from scrapy.cmdline import execute

import sys
import os

# print(__file__) # D:/scrapy/ArticleSpider/main.py
# print(os.path.dirname(__file__)) # D:/scrapy/ArticleSpider
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# execute(["scrapy","crawl","Baidu"])
execute(["scrapy","crawl","zhihu"])