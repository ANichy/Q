# from django.conf import settings
# import logging
# logger = logging.getLogger(__name__)

# class Im(dict):
#
#     __init__(self, json:dict)
from rest_framework.response import Response
# from django.http import HttpResponse
from requests.models import Request


# class Getter:
#
#     # TM: int, alg_id: int, tr_id: int, dl: int, prio: int, body: dict
#     def load(self, request: Request):
#         print(dict(request.POST))
#         serializer = ImSerializer(data=dict(request.POST))
#         if serializer.is_valid():
#             serializer.save()
#         return Response({"status": "Success"}, status=status.HTTP_201_CREATED)
#         # return {'all': 1}

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImSerializer
from .models import Im


# @api_view(['GET', 'POST'])
def getter_amqp(request):
    """
    todo: write
    """
    # if request.method == 'GET':
    #     snippets = Im.objects.all()
    #     serializer = ImSerializer(snippets, many=True)
    #     return Response(serializer.data)
    #
    # elif request.method == 'POST':
    #     serializer = ImSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         # print(serializer)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
