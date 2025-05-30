import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
interface sendType{
  email:string,
  emailType:string,
  userId:string
}
export const sendEmail = async ({ email, emailType, userId }:sendType) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
   
    if (emailType == "VERIFY") {
     const verifyUser= await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      console.log(verifyUser)
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "raghuvamshinaveensingh@gmail.com",
        pass: process.env.PASS_KEY!,
      },
    });
    const mailOptions = {
      from: "raghuvamshinaveensingh@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${process.env.domain}/${emailType === 'VERIFY' ? `verifyemail?token=${hashedToken}` : `resetpassword?token=${hashedToken}`}">here</a> to ${
        emailType == "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste link in url browser</p> <br/> ${emailType=='VERIFY'?`${process.env.domain}/verifyemail?token=${hashedToken}`:`${process.env.domain}/resetpassword?token=${hashedToken}`}`,
    };
    const mailresponse=await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
     if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};
