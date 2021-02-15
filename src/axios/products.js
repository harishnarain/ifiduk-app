import axios from 'axios';

export const fetchProducts = async (query) => {
  let queryParams = '';

  if (query) {
    queryParams = `?name=${query}`;
  }

  return axios
    .get(`${process.env.REACT_APP_FUNC_URL}/products${queryParams}`, {
      headers: {
        'x-functions-key': process.env.REACT_APP_FUNC_GET_PRODUCTS_KEY,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const createProduct = async ({ name, description, frontend, backend }, token) =>
  axios
    .post(
      'https://ifiduk-api.azurewebsites.net/api/products',
      {
        name,
        description,
        frontend,
        backend,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-functions-key': 'L5lXKxaegg/Ykde4GIMHdJ6Pn8eZgNTmyU2NZ83gUotK5yhOgU3y1Q==',
        },
      },
    )
    .then((res) => res)
    .catch((err) => err);
