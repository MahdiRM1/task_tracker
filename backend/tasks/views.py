import json
from rest_framework import generics, permissions, viewsets
from django.contrib.auth.models import User

from tasks.models import Task, ActivityLog
from tasks.serializers import RegisterSerializer, TaskSerializer, ActivityLogSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Task.objects.all()
    filterset_fields = ['status', 'priority']
    search_fields = ['title']

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        task = serializer.save(owner=self.request.user)
        ActivityLog.objects.create(
            user=self.request.user,
            task_id=task.id,
            task_title=task.title,
            action=ActivityLog.Action.CREATED,
            new_value=json.dumps(TaskSerializer(task).data, ensure_ascii=False),
        )

    def perform_update(self, serializer):
        old_data = TaskSerializer(serializer.instance).data
        old_json = json.dumps(old_data, ensure_ascii=False)

        old_title = serializer.instance.title
        old_description = serializer.instance.description
        old_status = serializer.instance.status
        old_priority = serializer.instance.priority
        old_due_date = serializer.instance.due_date

        new_task = serializer.save()
        new_data = TaskSerializer(new_task).data
        new_json = json.dumps(new_data, ensure_ascii=False)

        if old_title != new_task.title:
            ActivityLog.objects.create(
                user=self.request.user,
                task_id=new_task.id,
                task_title=new_task.title,
                action=ActivityLog.Action.TITLE_CHANGED,
                old_value=old_json,
                new_value=new_json
            )

        if old_description != new_task.description:
            ActivityLog.objects.create(
                user=self.request.user,
                task_id=new_task.id,
                task_title=new_task.title,
                action=ActivityLog.Action.DES_CHANGED,
                old_value=old_json,
                new_value=new_json
            )

        if old_status != new_task.status:
            ActivityLog.objects.create(
                user=self.request.user,
                task_id=new_task.id,
                task_title=new_task.title,
                action=ActivityLog.Action.STATUS_CHANGED,
                old_value=old_json,
                new_value=new_json
            )

        if old_priority != new_task.priority:
            ActivityLog.objects.create(
                user=self.request.user,
                task_id=new_task.id,
                task_title=new_task.title,
                action=ActivityLog.Action.PRIORITY_CHANGED,
                old_value=old_json,
                new_value=new_json
            )

        if old_due_date != new_task.due_date:
            ActivityLog.objects.create(
                user=self.request.user,
                task_id=new_task.id,
                task_title=new_task.title,
                action=ActivityLog.Action.DUE_DATE_CHANGED,
                old_value=old_json,
                new_value=new_json
            )

    def perform_destroy(self, instance):
        ActivityLog.objects.create(
            user=self.request.user,
            task_id=instance.id,
            task_title=instance.title,
            action=ActivityLog.Action.DELETED,
            old_value=json.dumps(TaskSerializer(instance).data, ensure_ascii=False),
        )
        instance.delete()

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ActivityLogViewSet(generics.ListAPIView):
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ActivityLog.objects.filter(user_id=self.request.user.id).order_by('-created_at')