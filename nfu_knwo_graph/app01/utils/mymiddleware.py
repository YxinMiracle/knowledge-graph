from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect
from django.urls import reverse


class UserAuth(MiddlewareMixin):
    def process_request(self, request):
        white_list = [reverse('upload'), reverse('rule')]  # 白名单，用户直接访问这里是不需要校验的
        if request.path not in white_list:
            return
        user_id = request.session.get('permission')  # 如果他之前登录过，就代表我们已经给他给予了session了
        if user_id:
            return
        else:  # 如果没有登录过，我们将用户重定向到login页面进行登录
            return HttpResponse("你没有权限访问，请勿强行访问")
