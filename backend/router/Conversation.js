const express = require("express");
const {
  create_conversation,
  get_conversation,
} = require("../repository/Conversation");

const conversation_router = express.Router();

conversation_router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const { data, error } = await create_conversation({ message });
    if (error) {
      console.log("create_user_error ", error);
      res.send(error);
    }
    res.send(data);
  } catch (error) {
    console.log("create_user_error ", error.message);
    res.status(500).send({ error: error.message });
  }
});

conversation_router.get("/", async (req, res) => {
  try {
    const { from, to } = req.body;
    const { data, error } = await get_user_by_name({ from, to });
    if (error) {
      console.log("get_user_by_name_error ", error);
      res.send(error);
    }
    res.send(data);
  } catch (error) {
    console.log("get_user_by_name_error ", error.message);
    res.status(500).send({ error: error.message });
  }
});

conversation_router.post("/from-to", async (req, res) => {
  try {
    const { from, to } = req.body;
    const { data, error } = await get_conversation({ from, to });
    if (error) {
      console.log("get_conversation_from_to_error ", error);
      res.send(error);
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("get_conversation_from_to_error ", error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = conversation_router;
