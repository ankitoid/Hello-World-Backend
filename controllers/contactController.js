import ContactUs from "../models/ContactUs.js";
import ContactSlider from "../models/ContactSlider.js";
import ContactCard from "../models/ContactCard.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// AWS SES Setup
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const sourceEmail = process.env.SOURCE_EMAIL;
const adminEmail = process.env.ADMIN_EMAIL;

// Utility function to send emails
// const sendEmail = async (to, subject, message) => {
//   const params = {
//     Destination: { ToAddresses: [to] },
//     Message: {
//       Body: { Html: { Charset: "UTF-8", Data: message } },
//       Subject: { Charset: "UTF-8", Data: subject },
//     },
//     Source: sourceEmail,
//   };
//   return ses.sendEmail(params).promise();
// };

const sendEmail = async (to, subject, message, replyTo) => {
  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Body: { Html: { Charset: "UTF-8", Data: message } },
      Subject: { Charset: "UTF-8", Data: subject },
    },
    Source: sourceEmail, // This must be a verified email
    ReplyToAddresses: [replyTo], // Set user's email as the reply-to address
  };
  console.log("ye check karo", params);
  return ses.sendEmail(params).promise();
};

// Contact Us Submission
// export const contactUs = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, company, enquiryType, message } = req.body;
//     if (!firstName || !lastName || !company || !enquiryType || !phone || !email || !message) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     const newContact = new ContactUs(req.body);
//     await newContact.save();

//     await sendEmail(adminEmail, "New Contact Form Submission", `<h1>New Contact Form</h1><p>${message}</p>`);
//     await sendEmail(email, "Thanks for Contacting Us", `<h1>Thank You</h1><p>We received your message.</p>`);

//     res.status(200).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to send message: ${error.message}` });
//   }
// };

export const contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, enquiryType, message } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !company ||
      !enquiryType ||
      !phone ||
      !email ||
      !message
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new ContactUs(req.body);
    await newContact.save();

    // Send email to Admin (from sourceEmail, but reply-to user's email)
    await sendEmail(
      adminEmail,
      "New Contact Form Submission",
      `<h1>New Contact Form</h1>
       <p><strong>Name:</strong> ${firstName} ${lastName}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Company:</strong> ${company}</p>
       <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
       <p><strong>Message:</strong> ${message}</p>`,
      email // User's email set as "Reply-To"
    );

    // Send acknowledgment email to the user
    await sendEmail(
      email,
      "Thanks for Contacting Us",
      `<h1>Thank You</h1>
       <p>Dear ${firstName},</p>
       <p>We have received your message and will get back to you soon.</p>`,
      sourceEmail
    );

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: `Failed to send message: ${error.message}` });
  }
};

// Contact Slider Submission
export const contactSlider = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await sendEmail(
      adminEmail,
      "New Contact Form Submission",
      `<h1>New Contact Form</h1>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong> ${message}</p>`,
      email // User's email set as "Reply-To"
    );
    const newContact = new ContactSlider(req.body);
    await newContact.save();

    await sendEmail(
      email,
      "Thanks for Contacting Us",
      `<h1>Thank You</h1>
       <p>Dear ${name},</p>
       <p>We have received your message and will get back to you soon.</p>`,
      sourceEmail
    );

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: `Failed to send message: ${error.message}` });
  }
};

// Contact Card Submission
export const contactCard = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await sendEmail(
      adminEmail,
      "New Contact Form Submission",
      `<h1>New Contact Form</h1>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong> ${message}</p>`,
      email // User's email set as "Reply-To"
    );
    const newContact = new ContactCard(req.body);
    await newContact.save();

    await sendEmail(
      email,
      "Thanks for Contacting Us",
      `<h1>Thank You</h1>
       <p>Dear ${name},</p>
       <p>We have received your message and will get back to you soon.</p>`,
      sourceEmail
    );

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Failed to send message: ${error.message}` });
  }
};
