import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../libs/cloudinary.js";
import { getRecieverId, io } from "../libs/socket.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`error in fetching users and error is ${error.message}`);
    res.status(500).json({ message: "Internal server error (gufsb)" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.log(`error in fetching users and error is ${error.message}`);
    res.status(500).json({ message: "Internal server error (gm)" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: recieverId } = req.params;
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const recieverSocketId = getRecieverId(recieverId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error in sending message: ${error.message}`);
    res.status(500).json({ message: "Internal server error (sendMessage)" });
  }
};
