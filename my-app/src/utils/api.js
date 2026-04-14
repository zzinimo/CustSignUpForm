export const createUserFetch = async (userData) => {
  const url = "http://localhost:3000/users";
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
