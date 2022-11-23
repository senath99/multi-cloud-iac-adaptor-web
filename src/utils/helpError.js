// ----------------------------------------------------------------------

export const codes = {
  // Email
  emailAlreadyinUse: {
    code: 'auth/email-already-in-use',
    errorDesc: 'There already exists an account with the given email address.'
  },
  invalidEmail: {
    code: 'auth/invalid-email',
    errorDesc: 'The email address is not valid.'
  },
  userDisabled: {
    code: 'auth/user-disabled',
    errorDesc:
      'The user corresponding to the given credential has been disabled.'
  },
  userNotFound: {
    code: 'auth/user-not-found',
    errorDesc: 'There is no user corresponding to the email address.'
  },

  // Password
  wrongPassword: {
    code: 'auth/wrong-password',
    errorDesc: 'Wrong password'
  },
  weakPassword: {
    code: 'auth/weak-password',
    errorDesc: 'Password should be at least 6 characters'
  }
};

const {
  emailAlreadyinUse,
  invalidEmail,
  userDisabled,
  userNotFound,
  wrongPassword,
  weakPassword
} = codes;

export function emailError(errors) {
  return {
    error:
      errors === emailAlreadyinUse.code ||
      errors === invalidEmail.code ||
      errors === userDisabled.code ||
      errors === userNotFound.code,
    errorDesc:
      (errors === emailAlreadyinUse.code && emailAlreadyinUse.errorDesc) ||
      (errors === invalidEmail.code && invalidEmail.errorDesc) ||
      (errors === userDisabled.code && userDisabled.errorDesc) ||
      (errors === userNotFound.code && userNotFound.errorDesc)
  };
}

export function passwordError(errors) {
  return {
    error: errors === wrongPassword.code || errors === weakPassword.code,
    helpererrorDesc:
      (errors === wrongPassword.code && wrongPassword.errorDesc) ||
      (errors === weakPassword.code && weakPassword.errorDesc)
  };
}
