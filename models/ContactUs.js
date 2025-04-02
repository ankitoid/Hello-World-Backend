import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  company: String,
  enquiryType: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;
