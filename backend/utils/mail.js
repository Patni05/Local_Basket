import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

transporter.verify((error, success) => {
   if (error) {
      console.log("MAIL ERROR =>", error);
   } else {
      console.log("MAIL SERVER READY");
   }
});

export const sendOtpMail=async (to,otp) => {
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}


export const sendDeliveryOtpMail = async (user, otp) => {

    console.log("USER =>", user)
    console.log("EMAIL =>", process.env.EMAIL)

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Delivery OTP",
        html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}

console.log("EMAIL:", process.env.EMAIL)
console.log("PASS:", process.env.PASS)
