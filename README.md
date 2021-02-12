# knowledge-graph（PEC智能机器人）

[![Fork me on Gitee](https://gitee.com/yxinmiracle/pic/raw/master/20210212192544.svg)](https://gitee.com/yxinmiracle/knowledge-graph)[![star](https://gitee.com/yxinmiracle/pic/raw/master/20210212192521.svg)](https://gitee.com/yxinmiracle/knowledge-graph/stargazers)<a href='https://gitee.com/yxinmiracle/knowledge-graph/members'><img src='https://gitee.com/yxinmiracle/knowledge-graph/badge/fork.svg?theme=dark' alt='fork'></img></a>[![Fork me on Gitee](https://gitee.com/yxinmiracle/pic/raw/master/20210212192600.svg)](https://gitee.com/yxinmiracle/knowledge-graph)

### 卡片

[![YxinMiracle/knowledge-graph](https://gitee.com/yxinmiracle/pic/raw/master/20210212192649.svg)](https://gitee.com/yxinmiracle/knowledge-graph)

### 引用的技术
Python3.8+Scrapy+Elasticsearch+Mysql+Neo4j+Django1.1

### 介绍

一个应用于教育方面的知识图谱应用

- Scarpy：用来进行百度以及知乎的问题和答案爬取，将爬取到的数据存入Mysql中
- Elasticsearch：1.用来进行问题的搜索，里面存储的是图数据库中的节点名称（用来）在搜索问题的时候提示用户。2.存储题目
- Mysql：存储scrapy爬取下来的数据
- Neo4j：用来存储知识点的相关的联系
- Django1.1：web框架

### 目前开发进程

- [x] Scrapy模拟搜索并且把数据爬取下来，存入数据库
- [x] Neo4j图数据库的数据存储，用python进行上床文件自动化存储
- [x] Elasticsearch存储问题以及存储关键名词用于提示用户

### 简略展示

#### （1）neo4j中的数据展示

![graph (2)](https://gitee.com/yxinmiracle/pic/raw/master/20210212210914.png)

#### （2）前端的搜索问题界面

![image-20210212211026266](https://gitee.com/yxinmiracle/pic/raw/master/20210212211026.png)

#### （3）搜索提示展示

![image-20210212211111582](https://gitee.com/yxinmiracle/pic/raw/master/20210212211111.png)

#### （4）搜索结果展示

![image-20210212211225279](https://gitee.com/yxinmiracle/pic/raw/master/20210212211225.png)

### 目前的目录结构

```
C:.
│  .gitignore
│  README.en.md
│  README.md
│  tree.txt
│  
├─nfu_knwo_graph
│  │  db.sqlite3
│  │  manage.py
│  │  
│  ├─.idea
│  │  │  .gitignore
│  │  │  misc.xml
│  │  │  modules.xml
│  │  │  nfu_knwo_graph.iml
│  │  │  vcs.xml
│  │  │  workspace.xml
│  │  │  
│  │  └─inspectionProfiles
│  │          profiles_settings.xml
│  │          Project_Default.xml
│  │          
│  ├─app01
│  │  │  admin.py
│  │  │  apps.py
│  │  │  models.py
│  │  │  tests.py
│  │  │  views.py
│  │  │  __init__.py
│  │  │  
│  │  ├─migrations
│  │  │  │  __init__.py
│  │  │  │  
│  │  │  └─__pycache__
│  │  │          __init__.cpython-38.pyc
│  │  │          
│  │  └─__pycache__
│  │          admin.cpython-38.pyc
│  │          apps.cpython-38.pyc
│  │          models.cpython-38.pyc
│  │          views.cpython-38.pyc
│  │          __init__.cpython-38.pyc
│  │          
│  ├─data
│  │      c#.xlsx
│  │      c语言专有名字解释.xlsx
│  │      c语言考纲.xlsx
│  │      c语言题目.xlsx
│  │      data_test.py
│  │      Python.xlsx
│  │      
│  ├─nfu_knwo_graph
│  │  │  settings.py
│  │  │  urls.py
│  │  │  wsgi.py
│  │  │  __init__.py
│  │  │  
│  │  └─__pycache__
│  │          settings.cpython-38.pyc
│  │          urls.cpython-38.pyc
│  │          wsgi.cpython-38.pyc
│  │          __init__.cpython-38.pyc
│  │          
│  ├─statics
│  │  ├─bootstrap-3.3.7-dist
│  │  │  ├─css
│  │  │  │      bootstrap-theme.css
│  │  │  │      bootstrap-theme.css.map
│  │  │  │      bootstrap-theme.min.css
│  │  │  │      bootstrap-theme.min.css.map
│  │  │  │      bootstrap.css
│  │  │  │      bootstrap.css.map
│  │  │  │      bootstrap.min.css
│  │  │  │      bootstrap.min.css.map
│  │  │  │      
│  │  │  ├─fonts
│  │  │  │      glyphicons-halflings-regular.eot
│  │  │  │      glyphicons-halflings-regular.svg
│  │  │  │      glyphicons-halflings-regular.ttf
│  │  │  │      glyphicons-halflings-regular.woff
│  │  │  │      glyphicons-halflings-regular.woff2
│  │  │  │      
│  │  │  └─js
│  │  │          bootstrap.js
│  │  │          bootstrap.min.js
│  │  │          npm.js
│  │  │          Timetables.min.js
│  │  │          
│  │  ├─css
│  │  ├─font-awesome-4.7.0
│  │  │  │  HELP-US-OUT.txt
│  │  │  │  
│  │  │  ├─css
│  │  │  │      font-awesome.css
│  │  │  │      font-awesome.min.css
│  │  │  │      
│  │  │  ├─fonts
│  │  │  │      fontawesome-webfont.eot
│  │  │  │      fontawesome-webfont.svg
│  │  │  │      fontawesome-webfont.ttf
│  │  │  │      fontawesome-webfont.woff
│  │  │  │      fontawesome-webfont.woff2
│  │  │  │      FontAwesome.otf
│  │  │  │      
│  │  │  ├─less
│  │  │  │      animated.less
│  │  │  │      bordered-pulled.less
│  │  │  │      core.less
│  │  │  │      fixed-width.less
│  │  │  │      font-awesome.less
│  │  │  │      icons.less
│  │  │  │      larger.less
│  │  │  │      list.less
│  │  │  │      mixins.less
│  │  │  │      path.less
│  │  │  │      rotated-flipped.less
│  │  │  │      screen-reader.less
│  │  │  │      stacked.less
│  │  │  │      variables.less
│  │  │  │      
│  │  │  └─scss
│  │  │          font-awesome.scss
│  │  │          _animated.scss
│  │  │          _bordered-pulled.scss
│  │  │          _core.scss
│  │  │          _fixed-width.scss
│  │  │          _icons.scss
│  │  │          _larger.scss
│  │  │          _list.scss
│  │  │          _mixins.scss
│  │  │          _path.scss
│  │  │          _rotated-flipped.scss
│  │  │          _screen-reader.scss
│  │  │          _stacked.scss
│  │  │          _variables.scss
│  │  │          
│  │  ├─img
│  │  │      logo.png
│  │  │      logo.psd
│  │  │      logo1.png
│  │  │      res_logo.png
│  │  │      
│  │  └─js
│  │          1.js
│  │          2.js
│  │          graph.js
│  │          jquery.js
│  │          jquery.min.js
│  │          
│  ├─templates
│  │      home.html
│  │      index.html
│  │      search.html
│  │      search_result.html
│  │      
│  └─utils
│      │  suggest_tools.py
│      │  tools.py
│      │  
│      └─__pycache__
│              suggest_tools.cpython-38.pyc
│              tools.cpython-38.pyc
│              
└─QuestionSpider
    │  main.py
    │  scrapy.cfg
    │  test.py
    │  
    ├─.idea
    │  │  .gitignore
    │  │  misc.xml
    │  │  modules.xml
    │  │  QuestionSpider.iml
    │  │  vcs.xml
    │  │  workspace.xml
    │  │  
    │  └─inspectionProfiles
    │          profiles_settings.xml
    │          Project_Default.xml
    │          
    ├─QuestionSpider
    │  │  items.py
    │  │  middlewares.py
    │  │  pipelines.py
    │  │  settings.py
    │  │  __init__.py
    │  │  
    │  ├─cookies
    │  │      zhihu.cookies
    │  │      
    │  ├─spiders
    │  │  │  Baidu.py
    │  │  │  zhihu.py
    │  │  │  __init__.py
    │  │  │  
    │  │  └─__pycache__
    │  │          Baidu.cpython-38.pyc
    │  │          zhihu.cpython-38.pyc
    │  │          __init__.cpython-38.pyc
    │  │          
    │  ├─tools
    │  │  │  crawls_tools.py
    │  │  │  
    │  │  └─__pycache__
    │  │          crawls_tools.cpython-38.pyc
    │  │          
    │  └─__pycache__
    │          items.cpython-38.pyc
    │          middlewares.cpython-38.pyc
    │          pipelines.cpython-38.pyc
    │          settings.cpython-38.pyc
    │          __init__.cpython-38.pyc
    │          
    └─zheye
        │  Kaiti-SC-Bold.ttf
        │  util.py
        │  zheyeV3.keras
        │  zheyeV4.keras
        │  zheyeV5.keras
        │  __init__.py
        │  
        └─realcap
                a.gif
                b.gif
                c.gif
                captcha (10).gif
                captcha (12).gif
                captcha (4).gif
                captcha (6).gif
                captcha-3.gif
                d.gif
                e.gif
```

