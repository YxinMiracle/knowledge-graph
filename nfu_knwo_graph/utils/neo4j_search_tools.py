# 用在前端问题搜索后的知识图谱显示
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