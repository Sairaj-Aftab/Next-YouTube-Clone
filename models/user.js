import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: [String],
      default: [],
    },
    subscribedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    history: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Videos",
      default: [],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userModel);
