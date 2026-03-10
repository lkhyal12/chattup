import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export async function getAllContactS(req, res) {
  try {
    const loggdInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggdInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (e) {
    console.log("error in the getallcontacts ", e);
    res.status(500).json({ messgae: "Server Internal Error" });
  }
}

export const getMessagesByUserId = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.log("error occured in the mssages by id function ", error);
    res.status(500).json({ message: "Ineternal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or Image is required" });
    }

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "You Cant Sen messages To yourself" });
    }

    let imageUrl;
    if (image) {
      const uploadImgResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadImgResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    // todo send message to the user if they are online in real time using socket.io
    return res.status(201).json({ newMessage });
  } catch (error) {
    console.log("error in send message function ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toHexString()
            : msg.senderId.toString(),
        ),
      ),
    ];
    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");
    res.status(200).json({ chatPartners });
  } catch (e) {
    console.log("error in get all chats function ", error);
    res.status(500).json({ message: "internal server error " });
  }
};
