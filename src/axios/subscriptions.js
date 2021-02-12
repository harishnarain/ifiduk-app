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
    .get(`https://ifiduk-api.azurewebsites.net/api/subscriptions${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-functions-key': 'z1GFRdckBpDQadYloBrJZFKxf3spaRfB0HqcfOqj1Mk74FvZ0MxZmg==',
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const deleteSubscription = async (subs, token) => {
  try {
    // eslint-disable-next-line
    for (const sub of subs) {
      axios.delete(`https://ifiduk-api.azurewebsites.net/api/subscriptions/${sub._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-functions-key': 'a43RsAf6ILP77oxYNnJsusWMgUNJ0UiwGFpG5SYTpbnuNbGqoCQ2Jw==',
        },
      });
    }
  } catch (err) {
    return err;
  }
};
