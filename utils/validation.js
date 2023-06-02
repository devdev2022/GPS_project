const validateid = (id) => {
  const idValidation = new RegExp(
    "^[a-z0-9]{8,20}$"
  );

  if (!idValidation.test(id)) {
    const err = new Error("invalid id");
    err.statuseCode = 400;
    throw err;
  }
};

const validatepw = (password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("invalid password");
    err.statuseCode = 400;
    throw err;
  }
};

const validatecarnumber = (carnumber) => {
  const carnumberValidation = new RegExp(
    "^[가-힣]{2} [0-9]{2}[가-힣]{1} [0-9]{4}$"
  );

  if (!carnumberValidation.test(carnumber)) {
    const err = new Error("invalid carnumber");
    err.statuseCode = 400;
    throw err;
  }
};

module.exports = { validateid, validatepw, validatecarnumber };
