export const PASSWORD_VALIDATION = {
  required: "Password is required",
  minLength: {
    value: 5,
    message: "At least six characters, combination of letters and numbers",
  },
};

export const PHONE_NUMBER_VALIDATION = {
  required: "Phone numbers is required",
  minLength: {
    value: 11,
    message: "Must be eleven digits",
  },
  maxLength: {
    value: 11,
    message: "Must be eleven digits",
  },
  pattern: {
    value: /^[0-9]/,
    message: "Phone number can only contain numbers",
  },
};

export const USER_NAME_VALIDATION = {
  required: "Username is required",
  minLength: {
    value: 3,
    message: "At least three characters",
  },
};

export const FIRST_NAME_VALIDATION = {
  required: "First name is required",
  minLength: {
    value: 3,
    message: "At least three characters",
  },
};

export const LAST_NAME_VALIDATION = {
  required: "Last name is required",
  minLength: {
    value: 3,
    message: "At least three letters",
  },
};

export const GENDER_VALIDATION = {
  required: "Gender is required",
  minLength: {
    value: 3,
    message: "At least three letters",
  },
};

export const EMAIL_VALIDATION = {
  required: "Email is required",

  pattern: {
    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    message: "This is not a valid email",
  },
  minLength: {
    value: 3,
    message: "This is not a valid email",
  },
};
