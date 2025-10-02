const userModel = require('../models/user.model')
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { deleteUserFromPinecone } = require('../services/vector.service');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

async function registerUser(req,res){
    const {fullName:{firstName,lastName},email,password} = req.body;
    
    const isUserAlereadyExists = await userModel.findOne({email})

    if(isUserAlereadyExists)
    {
        return res.status(400).json({message:"👦User already registered! Please login."});

    }
    const user = await userModel.create({
        fullName:{ 
            firstName,lastName 
        },
        email,
        password:await bcrypt.hash(password,10)
    })
   const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
   res.cookie("token", token, {
  httpOnly: true,
  secure: true,       // Render uses HTTPS → must be true
  sameSite: "none"    // Needed for cross-site requests
});

    res.status(201).json({
  message: "User registered successfully",
  user: {
    _id: user._id,
    email: user.email,
    fullName: user.fullName // send as object, not string
  }
});

}
async function loginUser(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email})

     if(!user)
     {
        return res.status(400).json({message:"Invalid Email "})
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);

     if(!isPasswordValid){
        return res.status(400).json({message:"Invalid  Password"})
     }
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
 res.cookie("token", token, {
  httpOnly: true,
  secure: true,       // 🔥 Render uses HTTPS → must be true
  sameSite: "none"    // 🔥 needed for cross-site cookies
});

 res.status(200).json({
  message: "Login successful",
  user: {
    _id: user._id,
    email: user.email,
    fullName: user.fullName // send as object
  }
});

}
async function logoutUser(req,res){
   res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});
res.status(200).json({ message: "Logout successful" });

    res.status(200).json({message:"Logout successful"});


}
async function profileUser(req,res){
      res.json(req.user);

}


async function removeProfileUser(req, res) {
  try {
    const userId = req.user._id;

    // Delete user-related data in MongoDB
    await Chat.deleteMany({ user: userId });
    await Message.deleteMany({ user: userId });

    // Delete user from MongoDB
    const detectUser = await userModel.findByIdAndDelete(userId);

    if (!detectUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user’s embeddings from Pinecone
    await deleteUserFromPinecone(userId);

    // Clear token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "User and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateProfileUser(req, res) {
  try {
    const userId = req.user._id; // from auth middleware
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Match frontend naming convention
    const { firstName, lastName, oldPassword, newPassword } = req.body;

    // Verify old password if new password is provided
    if (newPassword) {
      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid old password" });
      }
    }

    // Build update object
    const updateData = {};
    if (firstName) updateData["fullName.firstName"] = firstName;
    if (lastName) updateData["fullName.lastName"] = lastName;
    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10);

    // Update user in DB
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        fullName: {
          firstName: updatedUser.fullName.firstName,
          lastName: updatedUser.fullName.lastName,
        },
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

 module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    profileUser,
    removeProfileUser,
    updateProfileUser
};

