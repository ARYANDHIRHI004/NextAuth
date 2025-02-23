import nodemailer from "nodemailer";
import User from "@/models/user.models";
import bcryptjs from "bcryptjs"


export const sendEmail = async ({email, emailType, userID} :any) => {
  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 10)

    if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userID, 
            {verifyToken:hashedToken, 
            verifyTokenExpiry:Date.now() + 3600000})
    }
    else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userID, 
            {forgotPasswordToken: hashedToken, 
            forgotPasswordTokenExpiry: Date.now() + 3600000})
    }

    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: 2525,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    const mailOption = {
        from: 'xyz@gmail.com',
        to: email,
        subject: emailType === "VERIFY"? "Verify your email" : "Reset your password",
        html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"Verify your email": "reset your password"}>
        <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
    }

    const mailResponse = await transport.sendMail(mailOption)
    return mailResponse


  } catch (error:any) {
    throw new Error(error.message)
  }
}

