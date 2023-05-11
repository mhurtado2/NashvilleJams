const _apiUrl = "/api/userGenre";

export const getUserGenres = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const addUserGenre = (userGenre) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userGenre),
  });
};
