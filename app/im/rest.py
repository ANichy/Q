from .models import I
from django.http import HttpResponse


def rest_mock(request):
    i = I.objects.first()
    if i:
        i.i += 1
    else:
        i = I(i=1)
    i.save()
    return HttpResponse(f'{i.i}')


def rest_mock_count(request):
    i = I.objects.first()
    v = i.i if i else 0
    return HttpResponse(f'{v}')
