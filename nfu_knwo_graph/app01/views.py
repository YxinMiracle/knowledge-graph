from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from nfu_knwo_graph.settings import BASE_DIR
from utils.es_search_tools import suggest_worker, get_question_and_tags
from utils.neo4j_search_tools import get_query, get_question_n
from django.views import View
from utils.upload_tools import Upload

import os


class Index(View):
    def get(self, request):
        return render(request, "index.html")


class Search(View):
    def get(self, request):
        query = "MATCH (n)-[r]->(m) RETURN m,n,r"
        return render(request, "search.html", {"query": query})


class Suggest(View):
    def get(self, request):
        suggest_msg = request.POST.get("suggest_msg")
        res = suggest_worker(suggest_msg)
        return JsonResponse(res)


class SearchResult(View):
    def get(self, request):
        question = request.GET.get('q')
        if question:
            result_list = get_question_and_tags(question)["hits"]["hits"]
            query = get_query(result_list)
            return render(request, "search_result.html", {"result_list": result_list, "query": query})
        else:
            print("没有得到question")
            return render(request, "search_result.html")


class Explain(View):
    def get(self, request):
        return render(request, "explain.html")

    def post(self, request):
        question_n = request.POST.get("question_n")
        print(question_n)
        desc, ret_query, name_list = get_question_n(question_n)

        ret = {"desc": desc, "ret_query": ret_query, "name_list": name_list}
        return JsonResponse(ret)


class Upload_V(View):
    def post(self, request):
        obj = request.FILES.get('upload_file')
        print(obj.name)
        f = open(os.path.join(BASE_DIR, 'upload_file', obj.name), 'wb')
        label = str(obj.name).split(".")[0]
        file_path = os.path.join(BASE_DIR, 'upload_file', obj.name)
        for chunk in obj.chunks():
            f.write(chunk)
        f.close()
        Upload(label, file_path).run()
        return HttpResponse('OK')

    def get(self, request):
        return render(request, "upload.html")
