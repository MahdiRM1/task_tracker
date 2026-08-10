from django.contrib.auth.models import User
from django.db import models

class Task(models.Model):
    class Status(models.TextChoices):
        TODO = 'TODO', 'To do'
        COMPLETED = 'COMPLETED', 'complete'

    class Priority(models.IntegerChoices):
        LOW = 1, "Low"
        MEDIUM = 2, "Medium"
        HIGH = 3, "High"

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)
    priority = models.IntegerField(choices=Priority.choices, default=Priority.MEDIUM)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.title

class ActivityLog(models.Model):
    class Action(models.TextChoices):
        CREATED = "CREATED", "Created"
        TITLE_CHANGED = "TITLE_CHANGED", "Title Changed"
        DES_CHANGED = "DES_CHANGED", "Description Changed"
        STATUS_CHANGED = "STATUS_CHANGED", "Status changed"
        PRIORITY_CHANGED = "PRIORITY_CHANGED", "Priority changed"
        DUE_DATE_CHANGED = "DUE_DATE_CHANGED", "Due date changed"
        DELETED = "DELETED", "Deleted"

    task_id = models.IntegerField(default=-1)
    task_title = models.CharField(max_length=100, default='')
    action = models.CharField(max_length=20, choices=Action.choices)
    old_value = models.TextField(blank=True, default='')
    new_value = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity_logs')

    def __str__(self):
        return f"{self.task_title}, {self.action}"
