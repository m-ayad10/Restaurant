const UserModel = require("../Models/UserScheema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../Models/AdminSchema");
require("dotenv").config();

const AdminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Admin already exist", status: false });
    }

    const adminModel = new AdminModel({ email, password});
    adminModel.password = await bcrypt.hash(password, 10);
    await adminModel.save();
    res.status(201).json({ message: "Signup successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Admin not found", status: false });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(403)
        .json({ message: "Incorrect password", status: false });
    }
    const key = process.env.ADMIN_SECRET_KEY;
    const jwtToken = jwt.sign(
      { id: user._id,email:user.email },
      key,
      { expiresIn: "2d" }
    );
    res.cookie("adminToken", jwtToken, {
      httpOnly: true,
      secure: false, // Set to true in production (for HTTPS)
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


const AdminVerifyToken=async(req,res)=>
  {
      try {
          const token=req.cookies.adminToken
          if (!token) {
              return res.status(401).json({message:"Access Denied",status:false})
          }
          const key=process.env.ADMIN_SECRET_KEY
          const verify=await jwt.verify(token,key)
          if (verify) {
              res.status(200).json({message:"",status:true,admin:verify})
          } else {
              return res.status(401).json({message:"Access Denied",status:false})
          }
      } catch (error) {
          res.status(401).json({message:"Invalid or expired token",status:false})
      }
  }
  
  const AdminSignOut = (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful", status: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", status: false });
    }
};

module.exports = { AdminSignup, AdminLogin, AdminVerifyToken, AdminSignOut };
