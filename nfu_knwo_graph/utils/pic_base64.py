# -*- coding: utf-8 -*-

import base64

with open("../statics/img/logo.png", "rb") as f:
    # b64encode是编码，b64decode是解码
    base64_data = base64.b64encode(f.read())
    # base64.b64decode(base64data)
    print(base64_data)
