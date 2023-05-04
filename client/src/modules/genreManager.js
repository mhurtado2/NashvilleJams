const _apiUrl = "/api/genre";

export const getAllGenres = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};

export const addGenre = (genre) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(genre),
    });
  };