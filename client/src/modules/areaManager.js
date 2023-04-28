const _apiUrl = "/api/areaOfTown";


export const getAllAreas = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};
