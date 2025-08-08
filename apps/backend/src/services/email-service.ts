import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: "cgdj jfit fxml lwcs",
    },
});

export const sendVerificationEmail = async (
    email: string,
    token: string,
    firstName: string
) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const mailOptions = {
        from: '"Immersio" <zaidazmat5@gmail.com>',
        to: email,
        subject: "Verify Your Email Address",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to ${process.env.APP_NAME}!</h2>
                <p>Hi ${firstName},</p>
                <p>Thank you for signing up! Please click the button below to verify your email address:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Verify Email Address
                    </a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all;">${verificationUrl}</p>
                <p>This link will expire in 24 hours for security purposes.</p>
                <p>If you didn't create an account with us, please ignore this email.</p>
                <hr style="margin: 30px 0;">
                <p style="color: #666; font-size: 12px;">
                    This email was sent by ${process.env.APP_NAME}. 
                    Please do not reply to this email.
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};