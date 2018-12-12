# from django.conf import settings
# import logging
# logger = logging.getLogger(__name__)
from .models import Im, Alg
from .worker import WorkerPool
from django.utils import timezone
from .serializers import ImSerializer
from django.http import HttpResponse
from threading import Thread, Event
from django.db import close_old_connections
import os


class Runer:

    RUNNER_THREAD_MAX_COUNT = 15

    def __init__(self):
        self.thread_count = 0
        self.stop_event = Event()

    def run_all(self, range_start=0, range_end=256):
        i = 0
        range_start = int(range_start)
        range_end = int(range_end)
        q = (range_end-range_start) / self.RUNNER_THREAD_MAX_COUNT
        t_range_start = range_start
        while self.thread_count < self.RUNNER_THREAD_MAX_COUNT:
            i += 1
            t_range_end = int(q*i)
            # print(t_range_start, t_range_end, q)
            if t_range_end > range_end:
                t_range_end = range_end
            if t_range_end < t_range_start:
                t_range_end = t_range_start
            if t_range_end > range_end:
                break
            # print('*', t_range_start, t_range_end)
            self._thread_run(t_range_start, t_range_end)
            t_range_start = t_range_end + 1

    def _thread_run(self, t_range_start, t_range_end):
        thread = Thread(target=self._one_runner, args=(t_range_start, t_range_end))
        thread.start()
        self.thread_count += 1

    def stop_all(self):
        self.stop_event.set()

    def _one_runner(self, range_start, range_end):
        """
        todo: write
        """
        while True:
            tm = timezone.now()
            subs = []
            try:
                x = Im.objects.filter(start_at__lte=tm,
                                      status=1,
                                      q__gte=range_start, q__lte=range_end).order_by('subs_id', 'start_at',
                                                                                     'created_at').all()
                for im in x:
                    if im.subs_id in subs:
                        continue
                    if Im.objects.get(id=im.id).status != 1:
                        continue
                    im.status = 2
                    # wrire tm+qota
                    im.save()
                    self.run(im)
                    subs.append(im.subs_id)
                    if self.stop_event.is_set():
                        break
                self.thread_count -= 1
            except Exception:
                continue

    def run(self, im: Im):
        worker = w.new_worker(im)
        w.start_worker(worker)


r = Runer()
start = os.getenv('START', 0)
end = os.getenv('END', 256)
w = WorkerPool()


def runer(request):
    r.run_all()
    return HttpResponse('Runners started')
    # return Response(serializer.data, status=status.HTTP_201_CREATED)


def one_runer(request):
    r._one_runner()
    return HttpResponse(f'One started. {r} objects')
    # return Response(serializer.data, status=status.HTTP_201_CREATED)


def stop_runer(request):
    r.stop_all()
    return HttpResponse('')
    # return Response(serializer.data, status=status.HTTP_201_CREATED)


def statistics(request):
    return HttpResponse(f'Runners {r.thread_count}/{r.RUNNER_THREAD_MAX_COUNT}, '
                        f'Workers {w.thread_count}/{w.WORKER_THREAD_MAX_COUNT}, '
                        f'Waiters {w.wait_workers_count}')
