const express = require("express");
const { create_user, get_user_by_name } = require("../repository/User");

const user_router = express.Router();

user_router.post("/register-user", async (req, res) => {
  try {
    const { user } = req.body;
    const { data, error } = await create_user({ name: user });
    if (error) {
      console.log("create_user_error ", error);
      res.send({ error });
    }
    res.send(data);
  } catch (error) {
    console.log("create_user_error ", error.message);
    res.send({ error: error.message });
  }
});

user_router.post("/login-user", async (req, res) => {
  try {
    const { user } = req.body;
    const { data, error } = await get_user_by_name({ name: user });
    if (error) {
      console.log("get_user_by_name_error ", error);
      res.send({ error });
    }
    if (data === undefined) {
      console.log("get_user_by_name_error ", data);
      res.send({ error: "username not found" });
    }
    console.log("get_user_by_name_error ", data);
    res.send(data);
  } catch (error) {
    console.log("get_user_by_name_error ", error.message);
    res.send({ error: error.message });
  }
});

module.exports = user_router;
