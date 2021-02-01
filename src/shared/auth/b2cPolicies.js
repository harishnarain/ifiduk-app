/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signupsignin',
    forgotPassword: 'B2C_1_forgotpassword',
    editProfile: 'B2C_1_editprofile',
  },
  authorities: {
    signUpSignIn: {
      authority:
          'https://ifiduk.b2clogin.com/ifiduk.onmicrosoft.com/b2c_1_signupsignin',
    },
    forgotPassword: {
      authority:
          'https://ifiduk.b2clogin.com/ifiduk.onmicrosoft.com/b2c_1_forgotpassword',
    },
    editProfile: {
      authority:
          'https://ifiduk.b2clogin.com/ifiduk.onmicrosoft.com/b2c_1_editprofile',
    },
  },
  authorityDomain: 'ifiduk.b2clogin.com',
};

export default b2cPolicies;
