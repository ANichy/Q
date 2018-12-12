from .serializers import ImSerializer
from django.http import HttpResponse
from threading import Thread
from .alg import Alg
from time import sleep
from django.db import close_old_connections

def worker(request):
    """
    todo: write
    """
    serializer = ImSerializer(data=request.data)
    w = Worker()
    r = w.load(serializer)
    return HttpResponse(r)


class Worker:

    def __init__(self, im):
        self.im = im
        self.data = ImSerializer(im).data

    # для запуска командой
    def start(self):
        alg = Alg()
        alg.load_file(alg.FILENAMES[int(self.data['alg'])])
        try:
            alg.run(self.data)
            self.im.status = 3
        except Exception as e:
            if e == 'ignore':
                self.im.status = 4
            elif e == 'error':
                self.im.status = 5
            else:
                self.im.status = 6
        finally:
            for i in range(10):
                try:
                    self.im.save()
                except Exception:
                    pass
            close_old_connections()

    def load_yaml(self, name):
        file

    def cmd_add(self):
        pass


class WorkerPool(object):

    WORKER_THREAD_MAX_COUNT = 50

    def __init__(self):
        self.thread_count = 0
        self.wait_workers_count = 0

    def new_worker(self, im):
        worker = Worker(im)
        return worker

    def start_worker(self, worker):
        while True:
            if self.thread_count < self.WORKER_THREAD_MAX_COUNT:
                thread = Thread(target=self.run_from_limited_thread_pool, args=(worker.start,))
                thread.start()
                break
            else:
                self.wait_workers_count += 1
                sleep(0.1)
                self.wait_workers_count -= 1

    def run_from_limited_thread_pool(self, f, *args, **kwargs):
        """Обретка над функцией, количество одновременно запущенных задач которого не должно превышать лимит

        Args:
            f: функция
            *args: аргументы функции
            **kwargs: именованные аргументы функции
        """
        if self.thread_count < self.WORKER_THREAD_MAX_COUNT:
            self.thread_count += 1
            f(*args, **kwargs)
            self.thread_count -= 1
