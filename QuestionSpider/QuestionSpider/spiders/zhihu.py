import datetime
import json
import time

import scrapy
from selenium import webdriver
from mouse import move, click
import pickle  # 可以将对象放入在文件当中
from urllib import parse
import re
from scrapy.loader import ItemLoader
from QuestionSpider.items import ZhihuAnswerItem, ZhihuQuestionItem


class ZhihuSpider(scrapy.Spider):
    name = 'zhihu'
    allowed_domains = ['www.zhihu.com']
    start_urls = ['https://www.zhihu.com/search?type=content&q=python']
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36"
    }
    BASE_URL = "https://www.zhihu.com/"

    # question第一页的answerurl
    start_answer_url = "https://www.zhihu.com/api/v4/questions/{0}/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cattachment%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Cis_labeled%2Cpaid_info%2Cpaid_info_content%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_recognized%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B*%5D.topics%3Bdata%5B*%5D.settings.table_of_content.enabled&offset={2}&limit={1}&sort_by=default"

    def parse(self, response):
        print(response.text)
        all_urls = response.xpath('//div[@itemprop="zhihu:question"]/a/@href').extract()
        all_urls = [parse.urljoin(self.BASE_URL, url) for url in all_urls]
        all_urls = filter(lambda x: True if x.startswith("https") else False, all_urls)  # 过滤一些不是https开头的url
        for url in all_urls:
            match_obj = re.match("(.*zhihu.com/question/(\d+))(/|$)", url)
            if match_obj:
                # 如果提取到question相关的页面下载后交给parse_question进行解析
                request_url = match_obj.group(1)
                # question_id = match_obj.group(2)
                yield scrapy.Request(request_url, headers=self.headers, callback=self.parse_question)

    def parse_question(self, response):
        # 处理question页面
        global question_id
        match_obj = re.match("(.*zhihu.com/question/(\d+))(/|$)", response.url)
        if match_obj:
            question_id = int(match_obj.group(2))

        item_loader = ItemLoader(item=ZhihuQuestionItem(), response=response)  # 记得传实例
        item_loader.add_xpath('title', '//h1[@class="QuestionHeader-title"]/text()')
        item_loader.add_xpath("content", '//div[@class="css-eew49z"]/div/div/span')
        item_loader.add_value("url", response.url)
        item_loader.add_value("zhihu_id", question_id)
        item_loader.add_xpath("answer_num", '//h4[@class="List-headerText"]/span/text()[1]')
        item_loader.add_xpath("comments_num", '//div[@class="QuestionHeader-Comment"]/button/text()')
        item_loader.add_xpath("watch_user_num",
                              '//div[@class="NumberBoard QuestionFollowStatus-counts NumberBoard--divider"]/div[@class="NumberBoard-item"]/div/strong/text()')
        item_loader.add_xpath("topics", '//div[@class="QuestionHeader-topics"]//div[@class="Popover"]/div/text()')

        question_item = item_loader.load_item()


        yield scrapy.Request(self.start_answer_url.format(question_id, 20, 0), callback=self.parse_answer,
                             headers=self.headers)
        yield question_item

    def parse_answer(self, response):
        ans_json = json.loads(response.text)
        is_end = ans_json["paging"]["is_end"]
        totals_answer = ans_json["paging"]["totals"]
        next_url = ans_json["paging"]["next"]

        # 提取answer的具体字段
        for answer in ans_json["data"]:
            answer_item = ZhihuAnswerItem()  # 等于一个实例
            answer_item["zhihu_id"] = answer["id"]
            answer_item["url"] = answer["url"]
            answer_item["question_id"] = answer["question"]["id"]
            answer_item["author_id"] = answer["author"]["id"] if "id" in answer["author"] else None
            answer_item["content"] = answer["content"] if "content" in answer else None
            answer_item["praise_num"] = answer["voteup_count"]
            answer_item["comments_num"] = answer["comment_count"]
            answer_item["create_time"] = answer["created_time"]
            answer_item["update_time"] = answer["updated_time"]
            answer_item["crawl_time"] = datetime.datetime.now()
            yield answer_item
        if not is_end:
            yield scrapy.Request(next_url, headers=self.headers, callback=self.parse_answer)

    def start_requests(self):
        """
        步骤
        :return:
        """
        # cookies = pickle.load(open("D:/scrapy/ArticleSpider/ArticleSpider/cookies/zhihu.cookie","rb"))
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.common.keys import Keys
        chrome_option = Options()
        chrome_option.add_argument("--disable-extensions")
        chrome_option.add_experimental_option("debuggerAddress", "127.0.0.1:9222")

        browser = webdriver.Chrome(executable_path="D:/chromeDriver/cd/chromedriver.exe", chrome_options=chrome_option)

        try:
            browser.maximize_window()
        except:
            pass

        browser.get("https://www.zhihu.com/signin")
        move(930, 360)  # 930 316
        time.sleep(3)
        click()
        time.sleep(4)
        browser.find_element_by_xpath('//input[@name="username"]').send_keys(Keys.CONTROL + "a")
        browser.find_element_by_xpath('//input[@name="username"]').send_keys("15014134753")
        time.sleep(3)
        browser.find_element_by_xpath('//input[@name="password"]').send_keys(Keys.CONTROL + "a")
        browser.find_element_by_xpath('//input[@name="password"]').send_keys("password")
        move(959, 609)
        click()
        time.sleep(5)

        login_success = False
        while not login_success:
            try:
                notify_ele = browser.find_element_by_class_name("Popover")
                print("登录成功！！！！")
                login_success = True
                break
            except:
                pass

            try:
                english_captcha_element = browser.find_element_by_class_name("Captcha-englishImg")
            except:
                english_captcha_element = None

            try:
                chinese_captcha_element = browser.find_element_by_class_name("Captcha-chineseImg")
            except:
                chinese_captcha_element = None

            if chinese_captcha_element:
                ele_position = chinese_captcha_element.location
                x_relative = ele_position["x"]
                y_relative = ele_position["y"]
                browser_navigation_panel_height = browser.execute_script(
                    'return window.outerHeight - window.innerHeight;')

                base64_text = chinese_captcha_element.get_attribute("src")
                import base64
                code = base64_text.replace("data:image/jpg;base64,", "")
                code = code.replace("%0A", "")
                file = open("code.jpg", "wb")
                file.write(base64.b64decode(code))
                file.close()

                from zheye import zheye
                z = zheye()
                positions = z.Recognize("code.jpg")

                last_position = []
                if len(positions) >= 2:
                    if positions[0][1] > positions[1][1]:
                        last_position.append([positions[1][1], positions[1][0]])
                        last_position.append([positions[0][1], positions[0][0]])
                    else:
                        last_position.append([positions[0][1], positions[0][0]])
                        last_position.append([positions[1][1], positions[1][0]])

                    first_position = [int(last_position[0][0]) / 2, int(last_position[0][1]) / 2]
                    second_position = [int(last_position[1][0]) / 2, int(last_position[1][1]) / 2]
                    move(x_relative + first_position[0],
                         y_relative + browser_navigation_panel_height + first_position[1])
                    click()
                    time.sleep(3)
                    move(x_relative + second_position[0],
                         y_relative + browser_navigation_panel_height + second_position[1])
                    click()
                    time.sleep(3)
                else:
                    last_position.append([positions[0][1], positions[0][0]])
                    first_position = [int(last_position[0][0]) / 2, int(last_position[0][1]) / 2]
                    move(x_relative + first_position[0],
                         y_relative + browser_navigation_panel_height + first_position[1])
                    click()
                    time.sleep(3)

                browser.find_element_by_xpath('//input[@name="username"]').send_keys(Keys.CONTROL + "a")
                browser.find_element_by_xpath('//input[@name="username"]').send_keys("15014134753")
                time.sleep(3)
                browser.find_element_by_xpath('//input[@name="password"]').send_keys(Keys.CONTROL + "a")
                browser.find_element_by_xpath('//input[@name="password"]').send_keys("password")
                move(959, 655)
                click()
                time.sleep(5)

                print(last_position)

        cookies = browser.get_cookies()
        pickle.dump(cookies, open("C:\\Users\\93915\\Desktop\\Django_work\\knowledge-graph\\QuestionSpider\\QuestionSpider\\cookies\\zhihu.cookies", "wb"))

        cookie_dict = {}
        for cookie in cookies:
            cookie_dict[cookie["name"]] = cookie["value"]

        return [scrapy.Request(url=self.start_urls[0], dont_filter=True, cookies=cookie_dict)]
