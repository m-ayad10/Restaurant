const mongoose = require("mongoose");

const AllOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Ordered",
  },
  address: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        required: true,
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      subTotal: {
        type: Number,
        required: true,
      },
    },
  ],
});

const AllOrderModel = mongoose.model("AllOrder", AllOrderSchema);
module.exports = AllOrderModel;
