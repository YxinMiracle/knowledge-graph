from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from nfu_knwo_graph.settings import BASE_DIR
from utils.es_search_tools import suggest_worker, get_question_and_tags, get_ans
from utils.neo4j_search_tools import get_query, get_question_n, get_labels
from django.views import View
from utils.upload_tools import Upload
from django.utils.safestring import mark_safe

import os


class MyPagenation():
    def __init__(self, page_num, total_count, get_data=None, per_page_num=10, page_num_show=5):
        """
        :param page_num: 当前页
        :param total_count: 数据总数量
        :param base_url: 基本路劲
        :param get_data: QueryDict 对象
        :param per_page_num: 每一页展示的数据
        :param page_num_show: 显示的页码数
        """
        self.per_page_num = per_page_num
        self.get_data = get_data

        try:
            page_num = int(page_num)
        except Exception:
            page_num = 1

        self.page_num = page_num

        shang, yu = divmod(total_count, self.per_page_num)

        # 总页码数
        if yu:
            page_num_count = shang + 1
        else:
            page_num_count = shang

        self.page_num_count = page_num_count

        try:
            page_num = int(page_num)
        except Exception as e:
            page_num = 1

        if page_num <= 0:
            page_num = 1
        elif page_num > page_num_count:
            page_num = page_num_count

        self.page_num_show = page_num_show
        half_show = self.page_num_show // 2
        if page_num - half_show <= 0:
            start_page_num = 1
            end_page_num = self.page_num_show + 1  # 加1是因为range

        elif page_num + half_show > page_num_count:
            start_page_num = page_num_count - self.page_num_show + 1
            end_page_num = page_num_count + 1  # 加1是因为range
        else:
            start_page_num = page_num - half_show
            end_page_num = page_num + half_show + 1  # 加1是因为range

        # 另外处理
        if page_num_count < page_num_show:
            start_page_num = 1
            end_page_num = page_num_count + 1

        self.start_page_num = start_page_num
        self.end_page_num = end_page_num

    @property
    def get_start_data_num(self):  # 得到数据 从第几个到第几个的数据
        return (self.page_num - 1) * self.per_page_num

    @property
    def get_end_data_num(self):
        return (self.page_num) * self.per_page_num

    def page_html(self):
        page_num_range = range(self.start_page_num, self.end_page_num)  # 下面的框需要几页
        class_str = 'class = "disabled"'
        page_html = ''
        page_pre_html = f'<li {class_str if self.page_num == 1 else ""}><a href="javascript:void(0)" page={self.page_num - 1 if self.page_num != self.start_page_num else None} aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'
        page_html += page_pre_html

        for i in page_num_range:
            if i == self.page_num:
                page_html += f'<li class="active"><a href=javascript:void(0)" page={i}>{i}</a></li>'
            else:
                page_html += f'<li><a href="javascript:void(0)" page={i}>{i}</a></li>'

        page_next_html = f'<li {class_str if self.page_num == self.page_num_count else ""}><a href="javascript:void(0)" page={self.page_num + 1 if self.page_num != self.end_page_num - 1 else None} aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>'
        page_html += page_next_html
        return mark_safe(page_html)


class Index(View):
    def get(self, request):
        return render(request, "index.html")


class Search(View):
    def get(self, request):
        label_list = get_labels()
        query = "MATCH (n)-[r]->(m) RETURN m,n,r"
        return render(request, "search.html", {"query": query, "label_list": label_list})


class Suggest(View):
    def post(self, request):
        suggest_msg = request.POST.get("suggest_msg")
        res = suggest_worker(suggest_msg)
        return JsonResponse(res)


class SearchResult(View):
    def get(self, request):
        question = request.GET.get('q')
        current_page = request.GET.get('page')
        if not current_page:
            current_page = 1
        if question:
            label_list = get_labels()
            result_list, tags_list = get_question_and_tags(question)
            total_count = result_list["hits"]["total"]
            print(total_count)
            pagenation = MyPagenation(page_num=current_page, total_count=total_count)
            result_list = result_list["hits"]["hits"][pagenation.get_start_data_num:pagenation.get_end_data_num]
            print(result_list)
            query = get_query(result_list)
            return render(request, "search_result.html",
                          {"result_list": result_list, "query": query, "label_list": label_list, "question": question,
                           "tags_list": tags_list, "page_msg": pagenation.page_html()})
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
        label_list = get_labels()
        return render(request, "explain.html",
                      {"desc": desc, "query": ret_query, "name_list": name_list, "label_list": label_list,
                       "question_n": question_n})


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
        return render(request, "upload_ok.html")

    def get(self, request):
        return render(request, "upload.html")


class UploadRule(View):
    def get(self, request):
        return render(request, "upload_rule.html")


class GetAns(View):
    def post(self, request):
        question = request.POST.get("question")
        ret_dict = get_ans(question)
        return JsonResponse(ret_dict)


class Go(View):
    def get(self, request):
        return render(request, "go.html")


class Ok(View):
    def get(self, request):
        return render(request, "upload_ok.html")
