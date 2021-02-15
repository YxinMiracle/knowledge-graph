from py2neo import Graph


# 用在前端问题搜索后的知识图谱显示，该方法是整个项目的败笔
def get_query(result_list):
    tags_list = set()
    labels_list = set()

    # 数据准备
    for result in result_list:
        _label = result["_source"]["label"]
        labels_list.add(_label)
        _tag = result["_source"]["tags"].split(" ")
        for __tag in _tag:
            tags_list.add(__tag)

    tags_list = list(tags_list)
    set_tags_list_str = str(tags_list)
    # 数据清洗，加上复杂的判断
    labels_list = list(labels_list)
    labels_len = len(labels_list)
    if labels_len == 1:
        query = "match (n:`%s`)-[r]->(p) where n.name in %s return n,r,p" % (labels_list[0], set_tags_list_str)
        print(query)
        return query
    elif labels_len == 2:
        query = "match (n:`%s`)-[r]->(p),(a:`%s`)-[r1]->[r2] where n.name in %s and a.name in %s return n,r,p"
        print(query)
        return query


def get_question_n(question_n):
    """
    该方法用来解释老师输入的专有名词
    :param question_n:
    :return: 将得到的字符串（答案）传回给前端
    """
    g = Graph("http://localhost:7474", username="neo4j", password="newxin.001206")
    query = "match (n) where n.name='%s' return n" % (question_n)
    desc = ""
    try:
        node = g.run(query).data()[0]
        desc = node.get('n').get("desc")
        print(">>>>>>>>>", desc)
    except IndexError as e:
        desc = "无这个名词的解释，已通知老师进行更新"

    ret_query = "match (n)-[r]->(p) where n.name='%s' return n,r,p" % (question_n)

    name_list = []
    # 将节点的名字放入一个列表中
    nodes = g.run(ret_query).data()
    for node in nodes:
        name = node.get('p').get("name")
        name_list.append(name)

    return desc, ret_query, name_list
