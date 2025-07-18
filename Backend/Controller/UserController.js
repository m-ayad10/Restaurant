const UserModel = require("../Models/UserScheema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist", status: false });
    }

    const userModel = new UserModel({ email, password, phone, fullName });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "User not found", status: false });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(403)
        .json({ message: "Incorrect password", status: false });
    }
    const key = process.env.SECRET_KEY;
    const jwtToken = jwt.sign(
      { id: user._id, fullName: user.fullName,email:user.email, phone: user.phone },
      key,
      { expiresIn: "24h" }
    );
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true, // Set to true in production (for HTTPS)
      sameSite: "Lax",
    });
    res
      .status(201)
      .json({ message: "Signin successfully", status: true});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error, status: false });
  }
};


const verifyToken=async(req,res)=>
  {
      try {
          const token=req.cookies.token
          if (!token) {
              return res.status(401).json({message:"Access Denied",status:false})
          }
          const key=process.env.SECRET_KEY
          const verify=await jwt.verify(token,key)
          if (verify) {
              res.status(200).json({message:"",status:true,user:verify})
          } else {
              return res.status(401).json({message:"Access Denied",status:false})
          }
      } catch (error) {
          res.status(401).json({message:"Invalid or expired token",status:false})
      }
  }
  
  const signOut = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful", status: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", status: false });
    }
};

const editUser=async(req,res)=>
{
  try {
    const {id}=req.params
    const {email,fullName,phone}=req.body        
    const updateUser=await UserModel.findByIdAndUpdate(id,{email,fullName,phone},{new:true,runValidators:true})    
    if (!updateUser) {
      return res.status(404).json({message:'User not found',status:false})
    }
     const key = process.env.SECRET_KEY;
    const jwtToken = jwt.sign(
      { id, fullName: updateUser.fullName,email:updateUser.email, phone: updateUser.phone },
      key,
      { expiresIn: "24h" }
    );
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true, // Set to true in production (for HTTPS)
      sameSite: "Lax",
    });
    res.status(200).json({message:'User Updated',status:true,data:updateUser})
  } catch (error) {
    res.status(500).json({message:'Internal server error',status:false,error})
  }
}

module.exports = { signup, login ,verifyToken,signOut,editUser};
