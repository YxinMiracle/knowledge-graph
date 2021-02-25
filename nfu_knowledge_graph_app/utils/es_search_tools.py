from elasticsearch import Elasticsearch

es = Elasticsearch(['127.0.0.1:9200'])


def suggest_worker(msg):
    body = {
        "suggest": {
            "text": msg,
            "my_term_suggest": {
                "term": {
                    "field": "title",
                    "size": 3
                }
            },
            "my_phrase_suggest": {
                "phrase": {
                    "field": "title",
                    "size": 3,
                    "highlight": {
                        "pre_tag": '<b class="text-danger">',
                        "post_tag": "</b>"
                    }
                }
            },
            "my_completion_suggest": {
                "completion": {
                    "field": "title",
                    "size": 3
                }
            }
        }
    }
    res = es.search(index="tags", doc_type="doc", body=body)['suggest']
    # my_completion_suggest = [   for option in ]
    l = set()
    if res['my_completion_suggest'][0]['options']:  # 如果这个搜索结果有值
        for item in res['my_completion_suggest'][0]['options']:
            l.add(item['_source']['title'])
    # term建议器
    if res['my_term_suggest']:
        for item in res['my_term_suggest'][0]["options"]:
            l.add(item['text'])

    # phrase建议器
    if res['my_phrase_suggest'][0]['options']:
        for item in res['my_phrase_suggest'][0]['options']:
            l.add(item['highlighted'])

    return {"suggest_result": list(l)}


def get_tags(res):
    hit_list = res["hits"]["hits"]
    tags_list = set()
    for result in hit_list:
        tags = result["_source"]["tags"].split(" ")
        for _tag in tags:
            tags_list.add(_tag)
    return list(tags_list)


def get_question_and_tags(question):
    body = {
        "query": {
            "match": {
                "question": question
            }
        },
        "size": 10,
        "from": 0,
        "highlight": {
            "pre_tags": "<b style='color:green;'>",
            "post_tags": "</b>",
            "fields": {
                "question": {}
            }
        }
    }
    res = es.search(index="question", doc_type="doc", body=body)
    tags_list = get_tags(res)
    return res, tags_list


def get_ans(question):
    body = {
        "query": {
            "match": {
                "question": question
            }
        },
        "size": 1,
        "from": 0,
    }
    res = es.search(index="question", doc_type="doc", body=body)["hits"]["hits"][0]
    ret_dict = {}
    ret_dict["question"] = res["_source"]["question"]
    ret_dict["A"] = res["_source"]["A"]
    ret_dict["B"] = res["_source"]["B"]
    ret_dict["C"] = res["_source"]["C"]
    ret_dict["D"] = res["_source"]["D"]
    ret_dict["ans"] = res["_source"]["ans"]
    ret_dict["tags"] = res["_source"]["tags"]
    ret_dict["label"] = res["_source"]["label"]
    return ret_dict
