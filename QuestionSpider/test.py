import re

url = 'http://www.baidu.com/link?url=RY9MgVZ4wvaXqBEW1c5xS3l9ceuw1YRODgkgc0pghQkBHiBgbFdmI92MMyodozf994QrpTEQB_iffVfYhfG8da'


type = re.findall("www.(.*?).com", url)[0]


