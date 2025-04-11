import mongoose from "mongoose";

const contactSliderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const ContactSlider = mongoose.model("ContactSlider", contactSliderSchema);
export default ContactSlider;
