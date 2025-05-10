'use server';
import nodemailer from 'nodemailer';

const domain = "http://localhost:3000"

export const sendEmail = async (email: string, token: string, path: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    try {
        await transporter.verify()
    } catch (error) {
        console.error("Failed to connect to email server", error)
        return
    }

    const confirmationLink = `${domain}/${path}?token=${token}`
    const mailOptions = {
        from: process.env.EMAIL_SERVER_USER,
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Failed to send email", error)
    }

}