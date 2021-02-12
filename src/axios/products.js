import axios from 'axios';

export const fetchProducts = async (query) => {
  let queryParams = '';

  if (query) {
    queryParams = `?name=${query}`;
  }

  return axios
    .get(`https://ifiduk-api.azurewebsites.net/api/products${queryParams}`, {
      headers: {
        'x-functions-key': '1sFv9gdJ6sisbjBvzPo8w7ge7ZbJvqJLMmi65qBLFXWpREawKaOxkw==',
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};
