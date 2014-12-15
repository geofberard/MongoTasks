import { Task } from "../definition/Task";

export const loadTasks = () =>
  fetch("http://localhost:8000/api/v1/tasks").then(response => response.json());

export const createTask = (task: Partial<Task>) =>
  fetch("http://localhost:8000/api/v1/task", {
    method: "POST",
    credentials: "include",
    mode: "no-cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

export const deleteTask = (task: Task) =>
  fetch(`http://localhost:8000/api/v1/task/remove/${task.id}`, {
    method: "POST",
    credentials: "include",
    mode: "no-cors",
  });

export const updateTaskState = (task: Task, done:boolean) =>
  fetch(`http://localhost:8000/api/v1/task/set-state/${task.id}/${done}`, {
    method: "POST",
    credentials: "include",
    mode: "no-cors",
  });