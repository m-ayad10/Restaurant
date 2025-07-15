const CartModel = require("../Models/CartScheema");

const addToCart = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.items) {
      return res.status(400).json({ status: false, message: "Missing required fields" });
    }
    const userId=req.body.userId
    const items=JSON.parse(req.body.items)
    
    const cart = await CartModel.findOne({ userId });
    if (cart) {
      items.forEach((newItem) => {
        const existingItem = cart.items.find((item) => item.itemId.toString() === newItem.itemId);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      });
      await cart.save();
      res.status(200).json({ message: "Items saved to cart", status: true ,data:cart});
    } else {
      const newCart = new CartModel({ userId, items});
      await newCart.save();
      res.status(200).json({ message: "Items saved to cart", status: true ,data:newCart});
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};

const fetchCart = async (req, res) => {
  const {userId}=req.params
  try {
    const data = await CartModel.findOne({userId});
    if (!data) {
      return res.status(404).json({ message: "Cart not found", status: false });
    }
    res.status(200).json({ message: "Data fetched", status: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: false, error });
  }
};
const CartAddCount = async (req, res) => {
  try {
    const { userId, itemId } = req.body;    

    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", status: false });
    }

    const cartIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId);

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart", status: false });
    }


    cart.items[cartIndex].quantity += 1;
    const updatedCart = await cart.save();

    res.status(200).json({ message: "Cart updated successfully", status: true, data: updatedCart });
  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ message: error.message, status: false });
  }
};

const CartDecreaseCount = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found", status: false });
    }

    const cartIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId);

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart", status: false });
    }

    if (cart.items[cartIndex].quantity == 1) {
      return res.status(400).json({ message: "Quantity cannot be negative", status: false });
    }

    cart.items[cartIndex].quantity -= 1;
    const updatedCart = await cart.save();

    res.status(200).json({ message: "Cart updated successfully", status: true, data: updatedCart });
  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ message: error.message, status: false });
  }
};

const deleteCart=async(req,res)=>
{
    try {
        const {userId,itemId}=req.query       
        const cart=await CartModel.findOne({userId})        
        if (cart) {
            const existingItemIndex=cart.items.findIndex((item)=>item.itemId.toString()===itemId)
            if (existingItemIndex!==-1) {
                //delete from cart
                cart.items.splice(existingItemIndex,1)

                const data=await cart.save()
                res.status(200).json({message:"Item removed from cart",status:true,data})
            } else {
                return res.status(404).json({message:'Item not found in cart',status:false})
            }
        } else {
            return res.status(404).json({message:'Cart not found',status:false})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error",error,status:false})
    }
}

module.exports = {CartAddCount,CartDecreaseCount,fetchCart,addToCart,deleteCart};
