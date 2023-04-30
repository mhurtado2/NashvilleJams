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

export const updateJam = (jam) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${jam.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jam),
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error(
                    "An unknown error occurred while trying to update a post.",
                );
            }
        });
    });
}

// export const updateJam = (jam) => {
//     return fetch(`${_apiUrl}/${jam.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(jam),
//     });
//   };

export const addJam = (jam) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jam),
  });
};

// export const updateJam = (jam) => {
//   return fetch(`${_apiUrl}/${jam.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(jam),
//   });
// };

export const deleteJam = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};