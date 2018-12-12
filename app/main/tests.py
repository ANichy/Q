from django.test import TestCase, Client
# from tamtam import TamTam
# from django.conf import settings
# from requests.exceptions import HTTPError
# import responses
from im.models import Im, Alg, AlgGroup
import pprint
import json
import asyncio
import time
from main.settings import redis


class TestBase(TestCase):

    def setUp(self):
        self.pp = pprint.PrettyPrinter(4)
        self.ag = AlgGroup.objects.create(name='xx')
        self.a = Alg.objects.create(name='aa', alg_group=self.ag)
        self.a.save()
        redis.delete(1)
        redis.delete(2)


class TestAll(TestBase):

    def test_health_check(self):
        client = Client()
        response = client.get('/health_check')
        self.assertEqual(response.status_code, 200, response.content.decode('utf8'))

    def test_getter_lite(self):
        client = Client()
        data = {'subs_id': 1, 'alg': self.a.id, }
        response = client.post('/getter', data=data)
        self.assertEqual(response.status_code, 201, response.content.decode('utf8'))
        self.assertEqual(Im.objects.count(), 1)
        self.assertEqual(Im.objects.get(subs_id=1).alg.name, 'aa')
        # self.assertEqual(json.dumps({'items': [{'alg': [str(self.a.id)]}]}), redis.get(1))

    def test_getter_full(self):
        client = Client()
        data = {'subs_id': 2, 'prio': 1, 'status': 2, 'start_at': '2018-07-20T04:40:31.213645', 'alg': self.a.id,
                'debug_level': 0, 'trace_id': 'fs', 'body': '{"xx": 1}', }
        response = client.post('/getter', data=data)
        self.assertEqual(response.status_code, 201, response.content.decode('utf8'))
        self.assertEqual(Im.objects.count(), 1)
        self.assertEqual(Im.objects.get(subs_id=2).alg.name, 'aa')
        self.assertEqual(Im.objects.get(subs_id=2).trace_id, 'fs')
        text = Im.objects.get(subs_id=2).body
        x = json.loads(text)
        self.assertEqual(x, {'xx': 1})

    def test_getter_neg(self):
        client = Client()
        data = {'subs_id': 1, }
        response = client.post('/getter', data=data)
        self.assertEqual(response.status_code, 400, response.content.decode('utf8'))
        data = {'subs_id': 1, 'alg': self.a.id, 'body': 'xx'}
        response = client.post('/getter', data=data)
        self.assertEqual(response.status_code, 400, response.content.decode('utf8'))

    def test_runer(self):
        client = Client()
        response = client.get('/runer')


class TestAsync(TestBase):

    # 15000 ~1m на SQLLite в 1 поток
    def test_getter_lite_many(self):
        client = Client()
        m = 150  # как ни странно, но растёт пропорционально
        for i in range(0, m):
            data = {'subs_id': i, 'alg': self.a.id, }
            response = client.post('/getter', data=data)
            # if response.status_code != 201:
            self.assertEqual(response.status_code, 201, response.content.decode('utf8'))
        self.assertEqual(Im.objects.count(), m)

    def test_getter_lite_many_async(self):
        m = 150  # как ни странно, но растёт пропорционально
        ioloop = asyncio.get_event_loop()
        tasks = []
        for i in range(0, m):
            data = {'subs_id': i, 'alg': self.a.id, }
            tasks.append(ioloop.create_task(run(data)))
            # if response.status_code != 201:
            # self.assertEqual(response.status_code, 201, response.content.decode('utf8'))
        ioloop.run_until_complete(asyncio.wait(tasks))
        ioloop.close()
        self.assertEqual(Im.objects.count(), m)

    def test_getter_lite_many_threading(self):
        from threading import Thread
        client = Client()
        m = 5  # как ни странно, но растёт пропорционально

        def f(i, id):
            data = {'subs_id': i, 'alg': id, }
            response = client.post('/getter', data=data)
            # if response.status_code != 201:
            self.assertEqual(response.status_code, 201, response.content.decode('utf8'))

        j = []
        for i in range(0, m):
            t = Thread(target=f, args=(i, self.a.id,))
            t.start()
            j.append(t)
        for thread in j:
            thread.join()
        self.assertEqual(Im.objects.count(), m)


async def run(data):
    client = Client()
    return client.post('/getter', data=data)
