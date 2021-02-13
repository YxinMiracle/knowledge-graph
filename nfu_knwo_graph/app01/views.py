from django.shortcuts import render
from django.http import JsonResponse
from utils.es_search_tools import suggest_worker, get_question_and_tags
from utils.neo4j_search_tools import get_query
from nfu_knwo_graph.settings import TYPES_LIST


# Create your views here.

def index(request):
    return render(request, "index.html")


def search(request):
    query = "MATCH (n)-[r]->(m) RETURN m,n,r"
    return render(request, "search.html", {"query": query})


def suggest(request):
    suggest_msg = request.POST.get("suggest_msg")
    res = suggest_worker(suggest_msg)
    return JsonResponse(res)


def search_result(request):
    question = request.GET.get('q')
    if question:
        result_list = get_question_and_tags(question)["hits"]["hits"]
        query = get_query(result_list)
        return render(request, "search_result.html", {"result_list": result_list, "query": query})
    else:
        print("没有得到question")
        return render(request, "search_result.html")
