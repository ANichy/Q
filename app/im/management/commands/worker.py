from django.core.management.base import BaseCommand
from ...worker import Worker


class Command(BaseCommand):
    help = 'Запуск исполнителя задач'

    # def add_arguments(self, parser):
    #     parser.add_argument('task', type=str)
    #
    #     parser.add_argument(
    #         'sec',
    #         type=int,
    #         help='second repit demon code',
    #         nargs='?',
    #         default=10,
    #     )
    #
    #     parser.add_argument(
    #         '-one',
    #         action='store_true',
    #         dest='one',
    #         help='load tasks to base',
    #     )

    def handle(self, *args, **options):
        # task_name = options['task']
        # if options['one']:
        #     x = task_load(task_name)
        #     self.stdout.write(task_name+':'+str(x))
        #     return
        # demon_load(task_name, options['sec'])
        r = Worker()
        while True:
            r.runer()
