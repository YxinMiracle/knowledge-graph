"""nfu_knwo_graph URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from app01 import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/', views.Index.as_view(), name="index"),
    url(r'^search/', views.Search.as_view(), name="search"),
    url(r'^suggest/', views.Suggest.as_view(), name="suggest"),
    url(r'^search_result/', views.SearchResult.as_view(), name="search_result"),
    url(r'^explain/', views.Explain.as_view(), name="explain"),
    url(r'^upload/', views.Upload_V.as_view(), name="upload"),
    url(r'^getAns/', views.GetAns.as_view(), name="getAns"),
    url(r'^rule/', views.UploadRule.as_view(), name="rule"),
    url(r'^go/', views.Go.as_view(), name="go"),
    url(r'^upload_ok/', views.Ok.as_view(), name="upload_ok"),
]
