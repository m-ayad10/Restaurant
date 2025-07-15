const Razorpay = require("razorpay");
const AllOrderModel = require("../Models/AllOrderSchema");
const CartModel = require("../Models/CartScheema");
const OrderModel = require("../Models/OrderScheema");
const crypto = require("crypto");
require("dotenv").config();

const razorPay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const RazorpayOrder = async (req, res) => {
  try {
    const { totalPrice } = req.body;
    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(), // fixed typo here
      payment_capture: 1,
    };
    const razorPayOrder = await razorPay.orders.create(options);
    res.status(200).json({
      message: "Razorpay order created",
      status: true,
      key: process.env.RAZORPAY_KEY_ID,
      razorpayOrderId: razorPayOrder.id,
      amount: razorPayOrder.amount,
      currency: razorPayOrder.currency,
    });
  } catch (error) {
    console.log("Razorpay error:", error); // debug error
    res
      .status(500)
      .json({ message: "Internal server error", error, status: false });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ message: "Invalid signature", status: false });
    }
    res.status(200).json({ message: "Valid signature", status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

const addOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;
    
    const cart = await CartModel.findOne({ userId });
    
    if (!cart) {
      console.log('kk');
      
      return res.status(404).json({ message: "Cart is empty", status: false });
    }

    const { items, totalPrice } = cart;

    // Prepare items for order
    const updatedItems = items.map((item) => {
      const plainItem = item.toObject();
      delete plainItem._id;
      plainItem.itemId = plainItem.itemId.toString();
      return plainItem;
    });

    // Create and save AllOrder
    const allOrder = new AllOrderModel({
      userId,
      items: updatedItems,
      totalPrice,
      address,
      // status and createdAt will use default values
    });
    const savedOrder = await allOrder.save();

    // Add to user's order history
    const order = await OrderModel.findOne({ userId });
    const orderEntry = {
      totalPrice,
      items: updatedItems,
      orderId: savedOrder._id,
      address,
      status: "Ordered", 
    };

    if (order) {
      order.orders.push(orderEntry);
      await order.save();
    } else {
      const newOrder = new OrderModel({
        userId,
        orders: [orderEntry],
      });
      await newOrder.save();
    }

    // Clear the user's cart
    await CartModel.updateOne({ userId }, { $set: { items: [] ,totalPrice:0} });

    res.status(200).json({ message: "Order created", status: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error, status: false });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { OrderId:orderId, status } = req.body; // or req.params if you send via URL
    
    // Find the order in AllOrderModel
    const allOrder = await AllOrderModel.findById(orderId);
    if (!allOrder) {
      return res
        .status(404)
        .json({ message: "Order not found in AllOrderModel", status: false });
    }

    // Find the user's order history in OrderModel
    const order = await OrderModel.findOne({ userId: allOrder.userId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order history not found", status: false });
    }

    // Find the specific order entry inside orders array
    const orderIndex = order.orders.findIndex(
      (item) => item.orderId.toString() === orderId
    );
    if (orderIndex === -1) {
      return res
        .status(404)
        .json({ message: "Order not found in OrderModel", status: false });
    }

    // Update the status
    allOrder.status = status;
    order.orders[orderIndex].status = status;

    // Save the updated order data
    await allOrder.save();
    await order.save();

    const updatedAllOrder=await AllOrderModel.find()

    res.status(200).json({
      message: "Order status updated",
      status: true,
      data: updatedAllOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error, status: false });
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    const data = await AllOrderModel.find();
    res.status(200).json({ message: "Orders fetched", status: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

const fetchUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await OrderModel.findOne({ userId });
    res.status(200).json({ message: "Orders fetched ", status: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

module.exports = {
  addOrder,
  updateOrder,
  fetchAllOrders,
  fetchUserOrders,
  RazorpayOrder,
  verifyPayment,
};
