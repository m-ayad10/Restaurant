const mongoose = require("mongoose");

const OrderScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orders: [
    {
      totalPrice: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
      },
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AllOrder",
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "Ordered",
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
          image: {
            required: true,
            type: String,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          subTotal: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

const OrderModel = mongoose.model("Order", OrderScheema);
module.exports = OrderModel;
