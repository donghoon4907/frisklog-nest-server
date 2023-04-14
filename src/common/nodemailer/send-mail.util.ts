import { createTransport } from 'nodemailer';
import * as smtpPool from 'nodemailer-smtp-pool';

export const sendMail = async (email: string, token: string) => {
    const mailConfig = {
        service: 'gmail',
        host: 'localhost',
        port: 465,
        // port: 587,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
        requireTLS: true,
        // tls: {
        //     rejectUnauthorize: false,
        // },
        maxConnections: 5,
        maxMessages: 10,
        pool: true,
    };

    let transporter = createTransport(smtpPool(mailConfig));

    return transporter.sendMail({
        from: `Frisklog ${mailConfig.auth.user}`,
        to: email,
        subject: 'Frisklog 인증 코드',
        html: `
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
        <tbody>
            <tr>
                <td align="center">
                    <table style="border: 1px solid #eaeaea; border-radius: 5px; margin: 40px 0;" width="600" border="0" cellspacing="0" cellpadding="40">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; text-align: left; width: 465px; padding: 30px">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
                                            <tbody>
                                                <tr>
                                                    <td align="center">
                                                        <h1 style="color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 24px; font-weight: normal; margin: 30px 0; margin-top: 15px; padding: 0;">
                                                            <b><span>Frisklog</span></b>
                                                        </h1>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p style="color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 24px;">
                                            안녕하세요. ${email.split('@')[0]}님
                                        </p>
                                        <p style="color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 24px;">
                                            인증 코드: [<b>${token}</b>]
                                        </p>
                                        <br>
                                        <p style=color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 24px;">
                                            감사합니다.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    });
};
