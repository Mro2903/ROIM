'use server';
import nodemailer from 'nodemailer';

const domain = "http://localhost:3000"

/**
 * Sends a verification email to the specified address with a confirmation link.
 *
 * @param email - The recipient's email address.
 * @param token - The unique token to be included in the confirmation link.
 * @param path - The URL path to be used for the confirmation link.
 * @returns A Promise that resolves when the email is sent or rejects/logs errors if sending fails.
 *
 * @remarks
 * This function uses nodemailer to send an email via a configured SMTP server.
 * The confirmation link is constructed using the provided path and token.
 * SMTP server configuration is read from environment variables.
 */
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