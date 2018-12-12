# from django.conf import settings
# import logging
# logger = logging.getLogger(__name__)


class HealthCheck:

    def check(self):
        return {'all': 1}
