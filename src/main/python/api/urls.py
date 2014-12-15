from django.urls import path

from . import views

urlpatterns = [
    path('tasks', views.read_tasks),
    path('task', views.create_task),
    path('task/remove/<slug:id>', views.delete_task),
    path('task/set-state/<slug:id>/<slug:state>', views.update_task_state),
]
