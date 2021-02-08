import axios from 'axios';

export const createSubscription = async ({ productId, name }) =>
  axios
    .post('http://localhost:7071/api/subscriptions', {
      productId,
      name,
    })
    .then((res) => res)
    .catch((err) => err);
