import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { MsalProvider } from '@azure/msal-react';
// import { Configuration, PublicClientApplication } from '@azure/msal-browser';

import 'fontsource-roboto';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// MSAL configuration
// const configuration: Configuration = {
//   auth: {
//     clientId: 'caee1535-c4a8-47ff-882d-b3cc5f17e4dd',
//     authority: 'https://ifiduk.b2clogin.com/ifiduk.onmicrosoft.com/B2C_1_signupsignin',
//     redirectUri: 'http://localhost:3000/',
//   },
// };

// const pca = new PublicClientApplication(configuration);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <MsalProvider instance={pca}> */}
      <App />
      {/* </MsalProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
