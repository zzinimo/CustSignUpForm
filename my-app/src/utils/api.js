const url = "http://localhost:3000/users";

export const createUserFetch = async (userData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create User");
  }

  return response.json();
};

export const login = async (userData) => {
  console.log("request to authenticate sending");
  const response = await fetch(`${url}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
};

export const authenticate = async () => {
  const response = await fetch(`${url}/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Login session expired");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${url}/logout`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error Logging out");
  }

  return response.json();
};
