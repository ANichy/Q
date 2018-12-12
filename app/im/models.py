from django.db import models
from django.conf import settings
# from django.utils import timezone


class Base(models.Model):
    created_at = models.DateTimeField("Create", help_text="Дата добавления", auto_now_add=True)
    updated_at = models.DateTimeField("Update", help_text="Дата обновления", auto_now=True)
    deleted_at = models.DateTimeField("Del", help_text="Дата удаления или пусто", blank=True, null=True)

    class Meta:
        abstract = True


class I(models.Model):
    i = models.IntegerField(blank=True, null=True)


class AlgGroup(Base):
    name = models.CharField("Title", help_text="Назание группы алгоритмов, которые долдны работать последовательно", max_length=255)

    class Meta:
        verbose_name = 'Группа алгоритмов'
        verbose_name_plural = '3. Группы алгоритмов'
        unique_together = (('name', ), )

    def __str__(self):
        return self.name


class Alg(Base):
    name = models.CharField("Title", help_text="Назание алгоритма, оригинальное", max_length=255)
    alg_group = models.ForeignKey(AlgGroup, on_delete=models.CASCADE, )

    class Meta:
        verbose_name = 'Алгоритм'
        verbose_name_plural = '2. Алгоритмы'
        unique_together = (('name', ), )

    def __str__(self):
        return self.name


from django.core.exceptions import ValidationError
# from django.utils.translation import gettext_lazy as _
import json


def validate_json(value):
    if value is not None:
        try:
            json.loads(value)
        except Exception as err:
            raise ValidationError(str(err))


class Im(Base):
    """'Список входящих сообщений'"""
    subs_id = models.IntegerField("subs_id", help_text="subs_id - ресурс", blank=True, null=True)
    start_at = models.DateTimeField("Started", help_text="Дата когда заявка должна выполниться", blank=True, null=True)
    alg = models.CharField("Alg", max_length=30, default='old')
    debug_level = models.IntegerField("Debug", help_text="Писать ли расширенные логи по заявке", default=0)
    trace_id = models.CharField("trace_id", help_text="trace_id для отслеживания пути заявки", max_length=30, blank=True, null=True)
    prio = models.IntegerField("Prio", help_text="1 - высокий, 5 - низкий", default=5)
    body = models.TextField("body", help_text="Тело с параметрами", blank=True, validators=[validate_json])
    status = models.IntegerField("Debug", default=1, help_text="Чат не будет обрабатываться в проме, если не NULL", blank=True, null=True)
    q = models.IntegerField(help_text='Для партицирования', null=False, default=None)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = '1. Заявки'
        # unique_together = (('chat_id', 'channel'), ('code', 'channel'),)

    def __str__(self):
        return str(self.id) + ': ' + str(self.subs_id) + ' ' + str(self.alg) + ' ' + str(self.start_at)
