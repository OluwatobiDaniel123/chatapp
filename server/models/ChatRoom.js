import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ sender: String, text: String, timestamp: Date }],
});
const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
export default ChatRoom;
