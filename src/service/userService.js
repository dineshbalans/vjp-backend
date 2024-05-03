import User from "./../model/userModel.js";

export const registerCheck = async (email) => {
  const result = await User.findOne({ email: email });
  return result;
};

export const loginCheck = async (email) => {
  const result = await User.findOne({ email: email }).select('+pswd');
  return result;
};

export const add = async (data) => {
  const result = await User.create(data);
  return result;
};

export const getAll = async () => {
  const result = await User.find({});
  return result;
};

export const getOne = async (id) => {
  const result = await User.findOne({ _id: id });
  return result;
};

export const update = async (id, data) => {
  const result = await User.updateOne({ _id: id }, data);
  return result;
};

export const remove = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};
