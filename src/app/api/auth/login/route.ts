export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/utils/zodSchemas';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function handler(req: NextRequest) {
  const body = await parseJSON(req);
  const parsed = loginSchema.safeParse(body);
  
  if (!parsed.success) {
    throw new APIError(400, 'Validation failed', parsed.error.issues);
  }

  const { email, password } = parsed.data;
  
  // Find user and validate password
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new APIError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new APIError(401, 'Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
  );

  // Create response with token
  const response = NextResponse.json(
    {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
    { status: 200 }
  );

  // Set secure cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}

export const POST = withErrorHandling(handler);
