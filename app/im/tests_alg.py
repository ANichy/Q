from django.test import TestCase
from .alg import Alg
import os


class TestAlg(TestCase):

    def test_first(self):
        alg = Alg()
        alg.load_file('add_string.yaml')
        alg.validate()

    def test_load_dir(self):
        for root, dirs, files in os.walk(Alg.DIR):
            if root != Alg.DIR:
                continue
            for filename in files:
                if filename.lower().endswith('.yaml'):
                    print(filename)
                    alg = Alg()
                    alg.load_file(filename)
                    alg.validate()
