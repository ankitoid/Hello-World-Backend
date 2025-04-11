import mongoose from "mongoose";

const contactCardSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const ContactCard = mongoose.model("ContactCard", contactCardSchema);
export default ContactCard;
