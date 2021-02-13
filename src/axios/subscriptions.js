import axios from 'axios';

export const createSubscription = async ({ productId, name }, token) =>
  axios
    .post(
      'https://ifiduk-api.azurewebsites.net/api/subscriptions',
      {
        productId,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-functions-key': 'OXnOaCSzie1j1RWXc4rY2pMcCxjxbk2DAGYuXzLLsAb0vXwockxOtA==',
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
    .get(`${process.env.REACT_APP_FUNC_URL}/subscriptions${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-functions-key': process.env.REACT_APP_FUNC_GET_SUB_KEY,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const deleteSubscription = async (subs, token) => {
  try {
    // eslint-disable-next-line
    for (const sub of subs) {
      axios.delete(`${process.env.REACT_APP_FUNC_URL}/subscriptions/${sub._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-functions-key': process.env.REACT_APP_FUNC_DEL_SUB_KEY,
        },
      });
    }
  } catch (err) {
    return err;
  }
};
