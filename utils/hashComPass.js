const bcrypt = require("bcrypt");

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};
