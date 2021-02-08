import axios from 'axios';

export const fetchProducts = async (query) => {
  let queryParams = '';

  if (query) {
    queryParams = `?name=${query}`;
  }

  return axios
    .get(`http://localhost:7071/api/products${queryParams}`)
    .then((res) => res.data)
    .catch((err) => err);
};
