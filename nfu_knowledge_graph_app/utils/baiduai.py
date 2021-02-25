from aip import AipOcr

""" 你的 APPID AK SK """
APP_ID = '23705931'
API_KEY = 'uOx6SGt76CGp6HsYYQWNF8rg'
SECRET_KEY = 'FWr4EckzANTdO1O44bYj3GgVQ89k1jDp'

client = AipOcr(APP_ID, API_KEY, SECRET_KEY)

""" 读取图片 """


def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()


def get_text(file_path):
    image = get_file_content(file_path)
    ret = client.basicAccurate(image)
    word_list = [word["words"] for word in ret["words_result"]]
    text = "".join(word_list)
    return text

