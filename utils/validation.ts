export const PASSWORD_VALIDATION = {
  required: "Password is required",
  minLength: {
    value: 5,
    message: "At least six characters, combination of letters and numbers",
  },
};

export const PHONE_NUMBER_VALIDATION = {
  required: "Phone number is required",
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


export const MERCHANTID_VALIDATION = {
  required: "merchand id is required",
  minLength: {
    value: 10,
    message: "Must be ten digits",
  },
  maxLength: {
    value: 10,
    message: "Must be ten digits",
  },
  pattern: {
    value: /^[0-9]/,
    message: "merchant id can only contain numbers",
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

export const ANSWER_ONE_VALIDATION = {
  required: "Security answer is required",
  maxLength: {
    value: 20,
    message: "Must be below 20 characters",
  },
};
export const ANSWER_TWO_VALIDATION = {
  required: "Security answer is required",
  maxLength: {
    value: 20,
    message: "Must be below 20 characters",
  },
};

export const REMARKS_VALIDATION = {
  required: false,
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


export const ACCOUNT_NUMBER_INPUT_VALIDATION = {
  required: "Account numbers is required",
  minLength: {
    value: 10,
    message: "Must be atleast 10 digits",
  },
  maxLength: {
    value: 10,
    message: "Must be atmost 10 digits",
  },
  pattern: {
    value: /^[0-9]/,
    message: "Account number can only contain numbers",
  },
};

export const HOUSE_NO_VALIDATION = {
  required: "House number is required",
  minLength: {
    value: 1,
    message: "Must be atleast 1 digits",
  },
  maxLength: {
    value: 10,
    message: "Must be less than 10 digits",
  },
  pattern: {
    value: /^[0-9]/,
    message: "House number can only contain numbers",
  },
};

export const POSTAL_NO_VALIDATION = {
  required: "postal number is required",
  minLength: {
    value: 2,
    message: "Must be two digits",
  },
};

export const BVN_NUMBER_INPUT_VALIDATION = {
  required: "Bvn number is required",
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
    message: "Bvn number can only contain numbers",
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
