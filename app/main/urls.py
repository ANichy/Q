from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import debug_toolbar
# from editor.urls import urlpatterns as bots_urls, urlpatterns_run as bots_run_url
# from api.urls import urlpatterns as q_urls
# from reps.urls import urlpatterns as rep_urls, urlpatterns_run as reps_run_url
# from tasks.urls import urlpatterns as task_urls, urlpatterns_run as tasks_run_url
# from users.urls import urlpatterns as user_urls, urlpatterns_run as users_run_url
from .views import *
# from django.views.decorators.cache import cache_page
# import rest_framework
# from rest_framework import routers
# from django.contrib.auth import views as auth_views
from im.getter import getter, get_redis
from im.worker import worker
from im.runer import runer, stop_runer, one_runer, statistics
from im.rest import rest_mock, rest_mock_count

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('__debug__/', include(debug_toolbar.urls)),
                  # path('login', LoginFormView.as_view()),
                  # path('rep/', include(rep_urls)),
                  path('ver', ver),
                  path('health_check', health_check),
                  path('rest_mock', rest_mock),
                  path('rest_mock_count', rest_mock_count),
                  path('getter', getter),
                  path('getredis', get_redis),
                  path('runer', runer),
                  path('oneruner', one_runer),
                  path('statistics', statistics),
                  path('stopruner', stop_runer),
                  path('worker', worker),
                  # path('webhook', webhook),
                  # path('login', auth_views.auth_login),
                  # path('login', auth_views.login, {'template_name': 'mysite/login_user.html'}),
                  # path('logout', LogoutView.as_view()),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# from django.conf.urls import url
# from django.contrib import admin
# from django.views.generic import TemplateView
# from . import views
#
# urlpatterns = [
#     url(r'^admin/', admin.site.urls),
#     url(r'^$', TemplateView.as_view(template_name='tempo_expert.html')),
#     url(r'^register/$', views..as_view()),
#     url(r'^/$', views..as_view()),
#     url(r'^/$', views..as_view()),
# ]
