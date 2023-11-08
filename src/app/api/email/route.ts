import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const emailHtml = async (name: string, email: string, message: string) => {
  return `
        <div style="background-color: #f4f5f7; padding: 20px; font-family: Arial, sans-serif;">
            <div style="background-color: #fff; border-radius: 5px; padding: 20px;">
                <h1 style="color: #17202e;">${name} wants to contact you!</h1>
                <p style="color: #1e1e1e;">Email: ${email}</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="color: #121821;">${message}</p>
            </div>
        </div>
    `;
};

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW
    }
  });

  const mailOptions: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    replyTo: email,
    subject: `Message from ${name} (${email})`,
    text: message,
    html: await emailHtml(name, email, message)
  };

  try {
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: 'Success!', status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Failed!', status: 500 });
  }
}
