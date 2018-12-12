from django.test import TestCase
from .runer import Runer
from unittest.mock import MagicMock


class TestRunner(TestCase):

    thread_run: dict = None

    def mock_thread_run(self, t_range_start, t_range_end):
        # print(t_range_start, t_range_end)
        self.thread_run[t_range_start] = t_range_end

    def test_runer_range(self):
        r = Runer()
        r._thread_run = MagicMock(side_effect=self.mock_thread_run)

        self.thread_run = {}
        r.RUNNER_THREAD_MAX_COUNT = 15
        r.run_all(0, 1)
        self.assertDictEqual({0: 0, 1: 1}, self.thread_run)

        self.thread_run = {}
        x = r.RUNNER_THREAD_MAX_COUNT + 1
        r.run_all(0, x)
        # self.assertDictEqual({0: 0, 1: 1}, self.thread_run)
        self.assertTrue(0 in self.thread_run)
        self.assertTrue(x in self.thread_run.values())
        for i in self.thread_run:
            self.assertTrue(i in self.thread_run)
        # print(self.thread_run)
