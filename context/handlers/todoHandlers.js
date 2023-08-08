export async function findTodosHandler() {
  const res = await fetch("/api/A_CR9TtyGeX6tC/todo/find");

  const data = await res.json();

  return data;
}

export async function createTodoHandler(title, tasks = []) {
  const res = await fetch("/api/A_CR9TtyGeX6tC/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      tasks,
    }),
  });

  const data = await res.json();

  return data;
}

export async function deleteTodoHandler(todoId) {
  const res = await fetch(`/api/A_CR9TtyGeX6tC/todo/delete?id=${todoId}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
}

export async function toggleTaskHandler(taskId, todoId) {
  const res = await fetch(`/api/A_CR9TtyGeX6tC/todo/toggle`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todoId,
      taskId,
    }),
  });

  const data = await res.json();

  return data;
}

export async function editTodoHandler(id, delTasks, newTasks, title) {
  const res = await fetch("/api/A_CR9TtyGeX6tC/todo/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      delTasks,
      newTasks,
      title,
    }),
  });

  const data = await res.json();

  return data;
}
