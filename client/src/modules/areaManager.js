const _apiUrl = "/api/areaOfTown";


export const getAllAreas = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
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