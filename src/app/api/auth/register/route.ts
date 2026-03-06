export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/utils/zodSchemas';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function handler(req: NextRequest) {
  const body = await parseJSON(req);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    throw new APIError(400, 'Validation failed', parsed.error.issues);
  }

  const { email, password, name } = parsed.data;

  // Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new APIError(409, 'Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
  );

  // Create response
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
    { status: 201 }
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
