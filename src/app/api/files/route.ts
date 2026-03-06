export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractToken, parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function getHandler(req: NextRequest) {
  const decoded = extractToken(req);

  const files = await prisma.file.findMany({
    where: { userId: decoded.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ files });
}

async function postHandler(req: NextRequest) {
  const decoded = extractToken(req);
  const body = await parseJSON(req);

  const { name, url, type, size, expiresAt } = body;

  // Validate required fields
  if (!name || !url || !type || typeof size !== 'number') {
    throw new APIError(400, 'Missing required file fields: name, url, type, size');
  }

  // Validate file size (max 10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  if (size > MAX_FILE_SIZE) {
    throw new APIError(400, 'File size exceeds maximum limit of 10MB');
  }

  const file = await prisma.file.create({
    data: {
      userId: decoded.id,
      name: name.trim(),
      url,
      type,
      size,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return NextResponse.json({ file }, { status: 201 });
}

export const GET = withErrorHandling(getHandler);
export const POST = withErrorHandling(postHandler);
