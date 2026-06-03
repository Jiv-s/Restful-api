import nodemailer from 'nodemailer'

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmai = async(to,subject,html)=>{
    from: `${process.env.SMTP_FROM_EMAIL}`,
    to,
    subject,
    html
}
const sendVerifiction = async(to,token)=>{
    from: `${process.env.SMTP_FROM_EMAIL}`,
    to,
    subject,
    html
}

export {sendVerifiction,sendEmai}