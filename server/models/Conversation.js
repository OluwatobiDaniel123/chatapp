// models/Conversation.js
import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assumes you have a User model
        required: true,
      },
    ],
    lastMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
