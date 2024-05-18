 
import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  itemId: {
    type: String,
  },
  itemTitle: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  subCategory: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  
  },
  subCategoryId: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },

  discountPercentage: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },
  // highlights: [
  //   {
  //     key: {
  //       type: String,
  //       required: true,
  //     },
  //     value: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  highlights: {
    type: String,
  },

  isSale: {
    type: Boolean,
    default: false,
  },

  isTrending: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;

 