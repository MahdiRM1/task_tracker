from django.contrib import admin
from django.contrib.admin import register

from tasks.models import *

@register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'priority', 'due_date', 'owner')

@register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ('task_title', 'user', 'action')