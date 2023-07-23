export async function findTodosHandler() {
  const res = await fetch("/api/A_CR9TtyGeX6tC/todo/find");

  const data = await res.json();

  return data;
}

export async function createTodoHandler(tasks = []) {}
