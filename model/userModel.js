let user = {
  id: "",
  name: "",
  email: "",
  password: "",
};

const userCreation = (id, name, email, password) => {
  user.id = id;
  user.name = name;
  user.email = email;
  user.password = password;
};
module.exports = { user, userCreation };
