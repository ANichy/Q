from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.generic.base import View
# from django.views.generic.edit import FormView
# from django.contrib.auth.forms import AuthenticationForm
# from django.contrib.auth import login, logout
# from django.conf import settings
from .healthcheck import HealthCheck
# from im.getter import Getter
# import json
import time
import os
# import main

# from django.shortcuts import render

# class RegisterFormView(FormView):
#     form_class = UserCreationForm
#     success_url = "/login/"
#     template_name = "register.html"
#
#     def form_valid(self, form):
#         form.save()
#         return super(RegisterFormView, self).form_valid(form)


def health_check(request):
    json = HealthCheck().check()
    return JsonResponse(json)


# def getter(request):
#     json = Getter().load(request)
#     return JsonResponse(json)

# class LoginFormView(FormView):
#     form_class = AuthenticationForm
#     template_name = "login.html"
#     success_url = "/"
#
#     def form_valid(self, form):
#         self.user = form.get_user()
#         login(self.request, self.user)
#         return super(LoginFormView, self).form_valid(form)
#
#
#
# class LogoutView(View):
#     def get(self, request):
#         logout(request)
#         return HttpResponseRedirect("/")


def ver(request):
    x = ['.git', '../.git', '../../.git', '../../../.git']
    v = ''
    for f in x:
        if os.path.exists(f):
            v = f
            break
    if v != '':
        v = ' от ' + time.strftime('%d/%m/%Y %H:%M %Z', time.localtime(os.path.getmtime(v)))
    # v = 'Q '+main.__version__+v
    if request.GET.get('send'):
        v += ' '+request.GET.get('send')
    return HttpResponse(v)
