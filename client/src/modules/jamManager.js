import { getToken } from "./authManager";

const _apiUrl = "/api/jam";


export const getAllJams = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};

export const getJamById = (id) => {
  return fetch(`${_apiUrl}/${id}`)
    .then((res) => res.json())
};

export const addTag = (tag) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const updateJam = (jam) => {
  return fetch(`${_apiUrl}/${jam.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jam),
  });
};

export const deleteTag = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};