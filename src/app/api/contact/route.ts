export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';
import { sendEmail } from '@/utils/email';

async function handler(req: NextRequest) {
  const body = await parseJSON(req);
  const { name, email, message } = body;

  // Validate inputs
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new APIError(400, 'Valid name is required');
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new APIError(400, 'Valid email is required');
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new APIError(400, 'Message is required');
  }

  // Send email
  try {
    await sendEmail({
      to: process.env.EMAIL_TO || process.env.EMAIL_USER || 'noreply@example.com',
      subject: `Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent.',
    });
  } catch (error) {
    console.error('Email send error:', error);
    throw new APIError(500, 'Failed to send message. Please try again later.');
  }
}

export const POST = withErrorHandling(handler);
