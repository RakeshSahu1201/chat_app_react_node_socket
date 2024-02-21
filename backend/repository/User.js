const { user_model } = require("../model/User");

const create_user = async ({ name }) => {
  try {
    const new_user = user_model({ name });
    const result = await new_user.save();
    return { data: result };
  } catch (error) {
    console.log("create_user_repo ", error.message);
    return { error: error.message };
  }
};

const get_user_by_name = async ({ name }) => {
  try {
    const [result] = await user_model.find({ name });
    return { data: result };
  } catch (error) {
    console.log("create_user_repo ", error.message);
    return { error: error.message };
  }
};

const get_users_without_me = async ({ me }) => {
  try {
    const result = await user_model.find({ $nor: [{ _id: me }] });
    return { data: result };
  } catch (error) {
    console.log("create_user_repo ", error.message);
    return { error: error.message };
  }
};

const get_users = async () => {
  try {
    const result = await user_model.find();
    return { data: result };
  } catch (error) {
    console.log("create_user_repo ", error.message);
    return { error: error.message };
  }
};

module.exports = {
  create_user,
  get_user_by_name,
  get_users_without_me,
  get_users,
};
