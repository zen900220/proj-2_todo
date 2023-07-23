export async function registerHandler(
  username,
  email,
  password,
  confirmPassword
) {
  const res = await fetch("/api/A_CR9TtyGeX6tC/user/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}

export async function loginHandler(email, password) {
  const res = await fetch("/api/A_CR9TtyGeX6tC/user/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}

export async function logoutHandler() {
  const res = await fetch("/api/A_CR9TtyGeX6tC/user/logout");

  const data = await res.json();

  return data;
}

export function loadHandler() {}

export function forgotPswdHandler(email) {}

export function resetPswdHandler(token, password, confirmPassword) {}
