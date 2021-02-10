import re

url = 'http://www.baidu.com/link?url=RY9MgVZ4wvaXqBEW1c5xS3l9ceuw1YRODgkgc0pghQkBHiBgbFdmI92MMyodozf994QrpTEQB_iffVfYhfG8da'


type = re.findall("www.(.*?).com", url)[0]


from w3lib.html import remove_tags

text = '<p>2018.12.30分手</p><p>2020.5.20他来找我复合</p><p>2020.9.18再次分手</p><p class="ztext-empty-paragraph"><br/></p><p>我们还会好吗？</p>'
print(remove_tags(text))