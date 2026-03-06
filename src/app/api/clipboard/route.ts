export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { clipboardSchema } from '@/utils/zodSchemas';
import { extractToken, parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function getHandler(req: NextRequest) {
  const decoded = extractToken(req);

  const history = await prisma.clipboard.findMany({
    where: { userId: decoded.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({ history });
}

async function postHandler(req: NextRequest) {
  const decoded = extractToken(req);
  const body = await parseJSON(req);
  const parsed = clipboardSchema.safeParse(body);

  if (!parsed.success) {
    throw new APIError(400, 'Validation failed', parsed.error.issues);
  }

  const item = await prisma.clipboard.create({
    data: {
      ...parsed.data,
      userId: decoded.id,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}

export const GET = withErrorHandling(getHandler);
export const POST = withErrorHandling(postHandler);
