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

  
export const getGenreById = (id) => {
  return fetch(`${_apiUrl}/${id}`)
    .then((res) => res.json())
};

export const updateGenre = (genre) => {
  return fetch(`${_apiUrl}/${genre.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  });
};


export const deleteGenre = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};