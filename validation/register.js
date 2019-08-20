module.exports = req => {
  const errors = [];

  if (!req.body.name) {
    errors.push({ message: "Please enter your name" });
  }

  if (!req.body.email) {
    errors.push({ message: "Please enter your email" });
  }

  if (!req.body.password) {
    errors.push({ message: "Please enter your password" });
  }

  if (req.body.password !== req.body.password2) {
    errors.push({ message: "Passwords must match" });
  }

  return {
    errors,
    notValid: Boolean(errors.length)
  };
};
