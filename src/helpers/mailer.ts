import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
export const sendEmail = async ({ email, emailType, userId }: any) => {
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
        user: "75ca79e3c36eb4",
        pass: "dcd6a33c2f60b5",
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};
