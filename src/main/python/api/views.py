import json
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import tasks_service


def read_tasks(request):
    return JsonResponse(tasks_service.read(), safe=False)


@csrf_exempt
def create_task(request):
    if request.method == 'POST':
        tasks_service.create(json.loads(request.body))
    return HttpResponse("OK")


@csrf_exempt
def delete_task(request, id):
    if request.method == 'POST':
        tasks_service.delete(id)
    return HttpResponse("OK")


@csrf_exempt
def update_task_state(request, id, state):
    if request.method == 'POST':
        tasks_service.update_state(id, state == 'true')
    return HttpResponse("OK")
