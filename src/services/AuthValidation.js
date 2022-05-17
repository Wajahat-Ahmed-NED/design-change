let regPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
let regName = /^[a-zA-Z\s]+$/;
export const isEmailValid = (email = "") => email.includes("@") && email.includes(".");
export const isPhoneNumberValid = (phoneNumber = "") =>
  !isEmpty(phoneNumber) && isMinLength(phoneNumber, 12) && phoneNumber.startsWith("+1");
export const isPasswordValid = (password) => regPassword.test(password);
export const isNameValid = (name) => regName.test(name);
export const isEmpty = (param = "") => param.trim().length === 0;
export const isMinLength = (param = "", minLength) => param.trim().length >= minLength;

export const validateSignup1 = (formValues, showError) => {
  if (isEmpty(formValues["name"])) {
    showError("Full Name field is required");
    return false;
  }
  if (!isNameValid(formValues["name"])) {
    showError("Please enter a valid name (alphabets only)");
    return false;
  }
  if (isEmpty(formValues["username"])) {
    showError("Username field is required");
    return false;
  }
  if (isEmpty(formValues["email"])) {
    showError("Email address is required");
    return false;
  }
  if (!isEmailValid(formValues["email"])) {
    showError("Please enter a valid email address");
    return false;
  }
  if (isEmpty(formValues["password"])) {
    showError("Password is required");
    return false;
  }
  if (!isPasswordValid(formValues["password"])) {
    showError("Password must contain letters and numbers, and must be 08 characters long");
    return false;
  }
  if (formValues["password"] !== formValues["confirmPassword"]) {
    showError("Passwords do not match!");
    return false;
  }
  return true;
};
export const validateSignup2 = (formValues, showError) => {
  if (formValues["country"].length == 0) {
    showError(`Country${errorMsgs["select"]}`);
    return false;
  }
  if (formValues["languages"].length == 0) {
    showError(`Language${errorMsgs["select"]}`);
    return false;
  }
  if (formValues["experience"].length == 0) {
    showError(`Experience${errorMsgs["select"]}`);
    return false;
  }

  return true;
};

export const validateLoginForm = (formValues, showError) => {
  if (isEmpty(formValues.username) || isEmpty(formValues.password)) {
    showError("Please enter your username/password to login.");
    return false;
  }
  // for (const key in formValues) {
  //   if (key === "email" && !isEmailValid(formValues[key])) {
  //     showError("Please enter a valid email address");
  //     return false;
  //   } else if (key === "password" && !isPasswordValid(formValues[key])) {
  //     showError("Password must contain letters and numbers, and must be 08 characters long");
  //     return false;
  //   } else return true;
  // }
  return true
};

export const validateResetPassword = (formValues, showError) => {
  for (const key in formValues) {
    if (key == "password" && !isPasswordValid(formValues[key])) {
      showError("Old Password must contain letters and numbers, and must be 08 characters long");
      return false;
    }
    if (formValues["password"] !== formValues["confirmPassword"]) {
      showError("Passwords do not match!");
      return false;
    }
  }
  return true;
};

export const validateChangePassword = (formValues, showError) => {
  for (const key in formValues) {
    if (key == "password" && isEmpty(formValues[key])) {
      showError("Current Password must NOT be empty");
      return false;
    }
    if (key == "newPassword" && !isPasswordValid(formValues[key])) {
      showError("New Password must contain letters and numbers, and must be 08 characters long");
      return false;
    }
    if (formValues["newPassword"] !== formValues["confirmPassword"]) {
      showError("Passwords do not match!");
      return false;
    }
  }
  return true;
};

export const validateExercise = (formValues, showError) => {
  if (isEmpty(formValues["title"])) {
    showError("Name of Exercise is required");
    return false;
  }
  if (!isEmailValid(formValues["video"])) {
    showError("Video of Exercise is required");
    return false;
  }
  return true;
};

const errorMsgs = {
  empty: " cannot be empty!",
  select: " not selected!",
};
