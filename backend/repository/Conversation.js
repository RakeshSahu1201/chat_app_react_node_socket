const { conversation } = require("../model/Conversation");

const create_conversation = async ({ message }) => {
  try {
    const new_conversation = conversation(message);
    const result = await new_conversation.save();
    return { data: result };
  } catch (error) {
    console.log("create_conversation error ", error);
    return { error: error.message };
  }
};

const get_conversation = async ({ from, to }) => {
  try {
    const conversations = await conversation.find({
      from: { $in: [from, to] },
      to: { $in: [to, from] },
    });
    return { data: conversations };
  } catch (error) {
    console.log("create_conversation error ", error);
    return { error: error.message };
  }
};
module.exports = { create_conversation, get_conversation };
