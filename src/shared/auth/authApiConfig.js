// The current application coordinates were pre-registered in a B2C tenant.
const authApiConfig = {
  b2cScopes: [
    'https://ifiduk.onmicrosoft.com/26077f63-802a-4d8f-aa28-bb9f611989cf/demo.read',
  ],
  webApi: 'http://localhost:5000/hello',
};

export default authApiConfig;
