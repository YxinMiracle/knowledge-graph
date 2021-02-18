# knowledge-graph（PEC智能机器人）

[![Fork me on Gitee](https://gitee.com/yxinmiracle/pic/raw/master/20210212192544.svg)](https://gitee.com/yxinmiracle/knowledge-graph)[![star](https://gitee.com/yxinmiracle/knowledge-graph/badge/star.svg?theme=dark)](https://gitee.com/yxinmiracle/knowledge-graph/stargazers)<a href='https://gitee.com/yxinmiracle/knowledge-graph/members'><img src='https://gitee.com/yxinmiracle/knowledge-graph/badge/fork.svg?theme=dark' alt='fork'></img></a>[![Fork me on Gitee](https://gitee.com/yxinmiracle/pic/raw/master/20210212192600.svg)](https://gitee.com/yxinmiracle/knowledge-graph)
### 卡片

[![YxinMiracle/knowledge-graph](https://gitee.com/yxinmiracle/knowledge-graph/widgets/widget_card.svg?colors=f50808,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/yxinmiracle/knowledge-graph)


### 引用的技术
Python3.8+Scrapy+Elasticsearch6.8.0+Mysql+Neo4j+Django1.1

- Scarpy：用来进行百度以及知乎的问题和答案爬取，将爬取到的数据存入Mysql中
- Elasticsearch：1.用来进行问题的搜索，里面存储的是图数据库中的节点名称（用来）在搜索问题的时候提示用户。2.存储题目
- Mysql：存储scrapy爬取下来的数据
- Neo4j：用来存储知识点的相关的联系
- Django1.1：web框架

### 介绍

一个应用于教育方面的知识图谱应用，目前处于大数据时代，学生们的学习十分的便捷，遇到不懂的问题去网上一艘就有许许多多的回答，但是也有许多的同学并不愿意这么做，经过调查显示出，这部分学生觉得上网上查的答案花样百出，并不知道哪一个是真正正确的答案，这个时候就会去询问老师，老师就很有可能会面临很多的重复性而无效的回答。

但是要是老师将学生频繁问到的问题录入到这个款PEC智能机器人平台的话，并且给出相对应的答案，再将相对应的知识点导图，学生在提问问题的时候不仅仅能看见标准答案，还能看见相近的知识点，这样对学生的学习是很有好处的。（适用于大部分的学科）

### 目前开发进度

- [x] Scrapy模拟搜索并且把数据爬取下来，存入数据库
- [x] Neo4j图数据库的数据存储，用python进行一件上传文件自动化存储
- [x] Elasticsearch存储问题以及存储关键名词用于提示用户
- [x] 前端界面的改善
- [x] 解释专有名词，并展示该知识点相近的知识点的知识图谱
- [x] 解释专有名词，出现该知识点相近的知识点的标签，点击可以查看相对应的题库（所有题目都由老师存入）

### 数据准备

#### Elasticsearch的数据准备

打开kibana6.8.0，创建两个索引，一个是tags（用来用户提示），一个是question（用来存储问题）

##### 创建tags索引：

```
PUT tags
{
  "mappings": {
    "doc":{
      "properties":{
        "title":{
          "type":"completion"
        }
      }
    }
  }
}
```

##### 创建question索引：

```
PUT question
{
  "mappings": {
    "doc":{
      "properties":{
        "question":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "A":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "B":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "C":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "D":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "ans":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "tags":{
          "type":"text",
          "analyzer":"ik_smart"
        },
        "label":{
          "type":"text",
          "analyzer":"ik_smart"
        }
      }
    }
  }
}
```

### 目前开发成果

#### （1）neo4j中的数据展示

![graph (2)](https://gitee.com/yxinmiracle/pic/raw/master/20210212210914.png)

#### （2）搜索页

![image-20210218080140788](https://gitee.com/yxinmiracle/pic/raw/master/20210218080141.png)

#### （3）搜索引擎提示以及纠错

![image-20210218080245444](https://gitee.com/yxinmiracle/pic/raw/master/20210218080245.png)

#### （4）问题搜索结果，相关知识点的知识图谱展示

![image-20210218080807643](https://gitee.com/yxinmiracle/pic/raw/master/20210218080807.png)

#### （5）上传文件的规则提醒

![image-20210218080625573](https://gitee.com/yxinmiracle/pic/raw/master/20210218080625.png)

#### （6）上传文件

![image-20210218080644327](https://gitee.com/yxinmiracle/pic/raw/master/20210218080644.png)

#### （7）上传文件成功

![image-20210218080710988](https://gitee.com/yxinmiracle/pic/raw/master/20210218080711.png)

#### （8）名词解释

![image-20210218080849933](https://gitee.com/yxinmiracle/pic/raw/master/20210218080850.png)

#### （9）快速导航

![image-20210218081009302](https://gitee.com/yxinmiracle/pic/raw/master/20210218081009.png)

### 问题

- [x] 知识图谱在搜索结果展示的时候，前端的可视化并没有展示出哪个颜色是什么科目，我们需要在neo4j添加数据的时候进行加一个科目的属性（此问题已解决）
- [ ] 搜索问题的结果相关性应该提高
- [ ] 本系统目前只能添加选择题，局限太大，需要开发一套合适的考试系统，做题系统



