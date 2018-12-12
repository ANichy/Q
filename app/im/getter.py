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


@api_view(['POST'])
def getter(request):
    serializer = ImSerializer(data=request.data)
    serializer.is_valid()
    exception = ''
    for _ in range(10):
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            exception = e
    return Response(f'{exception}', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_redis(request):
    from rediscluster import StrictRedisCluster
    REDIS_NODES = [
        {"host": "localhost", "port": "7001"},
        {"host": "localhost", "port": "7002"},
        {"host": "localhost", "port": "7003"}
    ]
    rc = StrictRedisCluster(startup_nodes=REDIS_NODES, decode_responses=True)
    rc.set('key', 'value')
    print(rc.get('key'))
    return rc.get('key')


@api_view(['GET'])
def get_queue_count(request):
    return Im.objects.count()
