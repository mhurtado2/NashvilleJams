const _apiUrl = "/api/genre";

export const getAllGenres = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};
