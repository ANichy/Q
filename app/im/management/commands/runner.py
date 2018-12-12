from django.core.management.base import BaseCommand
from ...runer import Runer, WorkerPool
import os


class Command(BaseCommand):
    help = 'Запускаем ранер по диапазону'

    # def add_arguments(self, parser):
    #     parser.add_argument('task', nargs='*', type=str)
    #
    #     parser.add_argument(
    #         '-f',
    #         action='store_true',
    #         dest='cronfile',
    #         help='generate cronfile and load tasktable',
    #     )
    #
    #     parser.add_argument(
    #         '-m',
    #         action='store_true',
    #         dest='tasktobase',
    #         help='load tasks to base',
    #     )
    #
    #     parser.add_argument(
    #         '-r',
    #         action='store_true',
    #         dest='run',
    #         help='load tasks to base',
    #     )

    def handle(self, *args, **options):
        # if options['tasktobase']:
        #     tasks_migration()
        # if options['cronfile']:
        #     crontab_file()
        # if options['run']:
        #     task_load_all()
        # for task_name in options['task']:
        #     x = task_load(task_name)
        #     self.stdout.write(task_name+':'+str(x))
        # r = Runer()
        # while True:
        #     r.runer()

        r = Runer()
        start = os.getenv('START', 0)
        end = os.getenv('END', 256)
        r.run_all(start, end)
