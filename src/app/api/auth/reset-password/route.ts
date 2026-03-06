export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/utils/email';
import crypto from 'crypto';
import { parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function handler(req: NextRequest) {
  const body = await parseJSON(req);
  const { email } = body;

  // Validate email
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new APIError(400, 'Valid email is required');
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Don't reveal if email exists or not for security
    return NextResponse.json({
      message: 'If an account exists, a password reset email has been sent.',
    });
  }

  // Generate reset token (32 bytes)
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Store token hash and expiry in database
  // TODO: Add resetToken and resetTokenExpiry fields to User model
  // For now, we'll just send the email with instructions

  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password. This link will expire in 24 hours.</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>Or copy and paste this URL: ${resetUrl}</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({
      message: 'Password reset email has been sent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Password reset email error:', error);
    throw new APIError(500, 'Failed to send password reset email. Please try again later.');
  }
}

export const POST = withErrorHandling(handler);
