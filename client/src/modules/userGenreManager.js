import { getToken } from "./authManager";

const _apiUrl = "/api/userGenre";

export const getUserGenres = () => {
    return fetch(_apiUrl)
      .then((res) => res.json())
  };

//   export const addUserGenre = (userGenre) => {
//     return getToken().then((token) => {
//         return fetch(_apiUrl, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userGenre),
//         }).then((resp) => {
//             if (resp.ok) {
//                 return resp.json();
//             } else if (resp.status === 401) {
//                 throw new Error("Unauthorized");
//             } else {
//                 throw new Error(
//                     "An unknown error occurred while trying to save a new jam.",
//                 );
//             }
//         });
//     });
// };


export const addUserGenre = (userGenre) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userGenre),
    });
  };
  


// export const deleteUserGenre = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${_apiUrl}/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }).then((resp) => {
//             if (resp.ok) {
//                 return resp;
//             } else if (resp.status === 401) {
//                 throw new Error("Unauthorized");
//             } else {
//                 throw new Error(
//                     "An unknown error occurred while trying to delete a jam.",
//                 );
//             }
//         });
//     });
// };