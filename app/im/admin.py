from django.contrib import admin
# from django.urls import reverse
# from django.utils.html import format_html
from .models import *
# from django.template.defaultfilters import truncatechars  # or truncatewords


class AlgGroupAdmin(admin.ModelAdmin):
    search_fields = ['name']
    # list_display = ['name', 'created_at', 'updated_at', 'deleted_at']
    fields = ['name', 'created_at', 'updated_at', 'deleted_at']
    ordering = ['name']


class AlgAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['alg_group']
    fields = ['name', 'alg_group', 'created_at', 'updated_at', 'deleted_at']
    ordering = ['name']


class ImAdmin(admin.ModelAdmin):
    search_fields = ['subs_id']
    list_filter = ['alg', 'status', 'prio']
    fields = ['subs_id', 'prio', 'status', 'start_at', 'alg', 'debug_level', 'trace_id', 'body', 'created_at', 'updated_at', 'deleted_at']


admin.site.register(AlgGroup, AlgGroupAdmin)
admin.site.register(Alg, AlgAdmin)
admin.site.register(Im, ImAdmin)
