// models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes you have a User model
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
