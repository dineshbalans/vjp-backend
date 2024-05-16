import Category from "../model/categoryModel.js";
export const add = async (data) => {
  const result = await Category.create(data);
  return result;
};

export const getAll = async () => {
  const result = await Category.find({}).populate("items");
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

export const createSub = async (categoryID, name) => {
  const category = await Category.findOne({ _id: categoryID });

  if (!category) {
    throw new Error("Category not found");
  }

  category.subCategorys.push({
    name: name,
  });

  const result = await category.save();

  return result.subCategorys.filter((item) => item.name === name)[0];
};
export const updateSub = async (categoryID, subCategoryID, name) => {
  const category = await Category.findOne({ _id: categoryID });

  category?.subCategorys?.map((item) => {
    if (item?._id.toString() === subCategoryID) {
      item.name = name;
    }
  });

  const result = await category.save();

  return result.subCategorys.filter(
    (item) => item?._id.toString() === subCategoryID
  )[0];
};

export const removeSub = async (categoryID, subCategoryID) => {
  const category = await Category.findOne({ _id: categoryID });

  if (category) {
    category.subCategorys = category.subCategorys.filter(
      (item) => item._id.toString() !== subCategoryID
    );
    await category.save();
    return { isDeleted: true };
  } else {
    return null;
  }
};

export const remove = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};
