const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "username must name not be empty"],
  },
});

const user_model = mongoose.model("User", user);

module.exports = { user_model };
