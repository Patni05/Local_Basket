import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendOtpMail = async (to, otp) => {
  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })

    console.log("MAIL SENT =>", info)

  } catch (error) {
    console.log("SEND MAIL ERROR =>", error)
  }
}

export const sendDeliveryOtpMail = async (user, otp) => {

  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Delivery OTP",
      html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })

    console.log("MAIL SENT =>", info)

  } catch (error) {
    console.log("SEND MAIL ERROR =>", error)
  }
}

console.log("EMAIL:", process.env.EMAIL)
console.log("PASS:", process.env.PASS)