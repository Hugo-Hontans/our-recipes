const User = require("../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { password, name } = req.body;
  if (!name || !password) {
    // Name or password null or undefined
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  // Creation of object User with hashed password
  const user = {
    name,
    password: passwordHash.generate(password)
  };
  // Check if user already exists in DB
  try {
    const findUser = await User.findOne({
      name
    });
    if (findUser) {
      return res.status(400).json({
        text: "The user already exists"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Save user in DB
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Success",
      name: userData.name,
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, name } = req.body;
  if (!name || !password) {
    // Name or password null or undefined
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  try {
    // Check if user already exists in DB
    const findUser = await User.findOne({ name });
    if (!findUser)
      return res.status(401).json({
        text: "The user doesn't exist"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Invalid password"
      });
    return res.status(200).json({
      token: findUser.getToken(),
      name: findUser.name,
      text: "Authentication successed"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

module.exports = function (app) {
    app.post('/login', login);
    app.post('/signup', signup);
}