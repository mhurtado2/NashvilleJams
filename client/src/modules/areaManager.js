const _apiUrl = "/api/areaOfTown";

export const getAllAreas = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const addArea = (areaOfTown) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(areaOfTown),
  });
};

export const getAreaById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const updateArea = (area) => {
  return fetch(`${_apiUrl}/${area.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(area),
  });
};

export const deleteArea = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};
