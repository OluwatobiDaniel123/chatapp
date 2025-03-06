import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
export const Messages = async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  try {
    // Check if a conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Create a new conversation if not exists
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    // Save the new message
    const message = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text,
    });
    await message.save();

    // Optionally update the lastMessage field in conversation
    conversation.lastMessage = text;
    await conversation.save();

    res.status(200).json({ conversation, message });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const Like = async (req, res) => {
  const { userId, likedUserId } = req.body;
  if (!userId || !likedUserId || userId === "null" || likedUserId === "null") {
    return res.status(400).json({ message: "Invalid user IDs" });
  }

  try {
    const user = await User.findById(userId);
    const likedUser = await User.findById(likedUserId);

    if (!user || !likedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    user.likes.push(likedUserId);
    await user.save();

    const likedUserSocket = onlineUsers.get(likedUserId);
    if (likedUserSocket) {
      io.to(likedUserSocket).emit("receiveLike", { fromUserId: userId });
    }

    if (likedUser.likes.includes(userId)) {
      return res.json({
        match: true,
        message: `You matched with ${likedUser.name}!`,
      });
    }

    res.json({ match: false });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const Profiles = async (req, res) => {
  const { userId } = req.query;
  if (!userId || userId === "null") {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const profiles = await User.find({ _id: { $ne: userId } }).limit(10);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

export const ProfileID = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};
