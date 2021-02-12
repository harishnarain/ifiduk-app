import axios from 'axios';

export const createSubscription = async ({ productId, name }, token) =>
  axios
    .post(
      'http://localhost:7071/api/subscriptions',
      {
        productId,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res)
    .catch((err) => err);

export const fetchSubscriptions = async (query, token) => {
  let queryParams = '';

  if (query) {
    queryParams = `?name=${query}`;
  }

  console.log(`[Token]: ${token}`);

  return axios
    .get(`http://localhost:7071/api/subscriptions${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const deleteSubscription = async (subs, token) => {
  try {
    // eslint-disable-next-line
    for (const sub of subs) {
      axios.delete(`http://localhost:7071/api/subscriptions/${sub._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    return err;
  }
};
