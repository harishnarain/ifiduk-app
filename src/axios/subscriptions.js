import axios from 'axios';

export const createSubscription = async ({ productId, name }) =>
  axios
    .post('http://localhost:7071/api/subscriptions', {
      productId,
      name,
    })
    .then((res) => res)
    .catch((err) => err);

export const fetchSubscriptions = async (query) => {
  let queryParams = '';

  if (query) {
    queryParams = `?name=${query}`;
  }

  return axios
    .get(`http://localhost:7071/api/subscriptions${queryParams}`)
    .then((res) => res.data)
    .catch((err) => err);
};
