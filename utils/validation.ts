
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

export const PASSWORD_VALIDATION = {
  required: "Password is required",
  minLength: {
    value: 5,
    message: "At least six characters, combination of letters and numbers",
  },
};

export const LAST_NAME_VALIDATION = {
  required: "Last name is required",
  minLength: {
    value: 3,
    message: "At least three letters",
  },
};


export const DOB_VALIDATION = {
  required: false,
  minLength: {
    value: 10,
    message: "At least three letters",
  },
};



