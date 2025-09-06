import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL_ADDRESS;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Recipient email is not set" },
        { status: 500 }
      );
    }

    // 📩 Email que vai para o dono do blog
    await resend.emails.send({
      from: "My Tech Blog <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `Nova mensagem de contato de ${name}`,
      replyTo: email,
      html: `
        <h2>Nova mensagem pelo formulário de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    await resend.emails.send({
      from: "My Tech Blog <onboarding@resend.dev>",
      to: email,
      subject: "Recebemos sua mensagem!",
      html: `
        <p>Olá ${name},</p>
        <p>Recebemos sua mensagem e logo entraremos em contato.</p>
        <p><em>Mensagem enviada:</em></p>
        <blockquote>${message}</blockquote>
        <p>Obrigado por acompanhar o blog! 🚀</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
