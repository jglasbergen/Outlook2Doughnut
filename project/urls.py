"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers
from rest_framework.documentation import include_docs_urls

from backend.views import AgendaItemViewset, PieChartViewset, TrendviewViewset

router = routers.DefaultRouter()
router.register(r'agendaitems', AgendaItemViewset, base_name='agendaitems')
router.register(r'piechartitems', PieChartViewset, base_name='piechart')
router.register(r'trendviewitems', TrendviewViewset, base_name='trendview')

urlpatterns = [
    url(r'^', include('backend.urls')),
    url(r'^api/', include(router.urls)),
    # url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^docs/', include_docs_urls(title='My API service')),
]
