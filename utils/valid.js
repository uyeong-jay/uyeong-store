//email 유효성 검사
// (stack overflow) How to validate an email address in JavaScript( regex )
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//유저 유효성 검사 유틸
const valid = (name, email, password, cf_password) => {
  if (!name || !email || !password) {
    return "Please add all fileds.";
  }

  if (!validateEmail(email)) {
    return "Invalid emails.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (password !== cf_password) {
    return "Confirm password did not match.";
  }
};

export default valid;
