const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  from: { type: String, required: [true, "select user to chat"] },
  to: { type: String, required: [true, "select user to chat"] },
  body: String,
});

const conversation = mongoose.model("conversation", conversationSchema);

module.exports = { conversation };
