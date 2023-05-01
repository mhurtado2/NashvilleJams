import { getToken } from "./authManager";

const _apiUrl = "/api/jam";


export const getAllJams = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};

// export const getAllJams = () => {
//     return getToken().then((token) => {
//         return fetch(_apiUrl, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }).then((resp) => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error(
//                     "An unknown error occurred while trying to get jams.",
//                 );
//             }
//         });
//     });
// };


export const getJamById = (id) => {
  return fetch(`${_apiUrl}/${id}`)
    .then((res) => res.json())
};


// export const getJamById = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${id}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }).then((resp) => {
//             if (resp.ok) {
//                 return resp.json();
//             } else {
//                 throw new Error(
//                     "An unknown error occurred while trying to get posts.",
//                 );
//             }
//         });
//     });
// };

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

// export const addJam = (jam) => {
//   return fetch(_apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(jam),
//   });
// };

export const addJam = (jam) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jam),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new jam.",
                );
            }
        });
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

// export const deleteJam = (id) => {
//   return fetch(`${_apiUrl}/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(id),
//   });
// };


export const deleteJam = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to delete a jam.",
                );
            }
        });
    });
};