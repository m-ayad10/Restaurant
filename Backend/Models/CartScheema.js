const mongoose = require("mongoose");

const CartScheema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      name: {
        required: true,
        type: String,
      },
      quantity: {
        required: true,
        type: Number,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      subTotal: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

CartScheema.pre("save", function (next) {
  this.items.forEach((item) => {
    item.subTotal = item.price * item.quantity;
  });

  this.totalPrice = this.items.reduce((acc, item) => acc + item.subTotal, 0);
  next();
});

CartScheema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set["items.$.quantity"]) {
    // Find the cart before update to access existing items
    const cart = await this.model.findOne(this.getQuery());

    if (cart) {
      cart.items.forEach((item) => {
        if (item.productId.toString() === update.$set["items.$.productId"]) {
          // Update subTotal only for the modified item
          item.subTotal = item.price * update.$set["items.$.quantity"];
        }
      });

      // Recalculate totalPrice
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.subTotal,
        0
      );

      // Apply the updates
      update.$set.totalPrice = cart.totalPrice;
      update.$set.items = cart.items;
    }
  }

  next();
});

const CartModel = mongoose.model("cart", CartScheema);

module.exports = CartModel;
