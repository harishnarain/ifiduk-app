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
