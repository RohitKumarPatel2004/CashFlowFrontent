function Validation(value = {}) {
  let error = {};

  const { email = "", password = "" } = value;

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!email) {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(email)) {
    error.email = "Email format is incorrect";
  }

  if (!password) {
    error.password = "Password should not be empty";
  }

  return error;
}

export default Validation;
