/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.
const awsmobile = {
  aws_project_region: 'ap-northeast-2',
  aws_cognito_identity_pool_id: 'ap-northeast-2:29c50e96-4957-4291-9994-c91b73c85a93',
  aws_cognito_region: 'ap-northeast-2',
  aws_user_pools_id: 'ap-northeast-2_7KThiBIcc',
  aws_user_pools_web_client_id: '3mfebe16gptd35tk7sbooq1m29',
  oauth: {
    domain: '9i44kx9ccuto-epuser.auth.ap-northeast-2.amazoncognito.com',
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:3010',
    redirectSignOut: 'http://localhost:3010',
    // redirectSignIn: 'https://o2.naraspacetechnology.com',
    // redirectSignOut: 'https://o2.naraspacetechnology.com',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: ['GOOGLE'],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_NUMBERS'],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  aws_cognito_login_mechanisms: ['EMAIL']
};
export default awsmobile;