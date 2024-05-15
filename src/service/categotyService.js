import Category from "../model/categoryModel.js";
export const add = async (data) => {
  const result = await Category.create(data);
  return result;
};

export const getAll = async () => {
  const result = await Category.find({}).populate('items');
  return result;
};
export const getAllName = async () => {
  const result = await Category.find({});
  return result;
};

export const getOne = async (id) => {
  const result = await Category.findOne({ _id: id });
  return result;
};

export const update = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const remove = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};
