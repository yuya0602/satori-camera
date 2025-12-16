import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create email content
    const emailContent = `
問い合わせフォームから新しいメッセージが届きました。

差出人: ${firstName} ${lastName}
メールアドレス: ${email}
件名: ${subject}

メッセージ:
${message}

---
このメールはSATORI CAMERAのウェブサイトから自動送信されています。
    `.trim();

    // In a production environment, you would use a service like Resend, SendGrid, or Nodemailer
    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      from: `${firstName} ${lastName} <${email}>`,
      to: 'mail@satori-camera-and-lenses.com',
      subject: `[お問い合わせ] ${subject}`,
      content: emailContent,
    });

    // TODO: Implement actual email sending
    // Example with Resend:
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@satori-camera-and-lenses.com',
    //   to: 'mail@satori-camera-and-lenses.com',
    //   replyTo: email,
    //   subject: `[お問い合わせ] ${subject}`,
    //   text: emailContent,
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
