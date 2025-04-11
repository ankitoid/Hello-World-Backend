import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // region: process.env.AWS_REGION,
  accessKeyId: "AKIA3TD2SJ62FMUGFP7O",
  secretAccessKey: "BManl8VsJq3Si+YMdWoudEyQswKsssi80ALm46ILc2U8",
  region: "us-east-1",
  
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export default ses;
