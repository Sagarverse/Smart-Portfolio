export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { noteSchema } from '@/utils/zodSchemas';
import { extractToken, parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function getHandler(req: NextRequest) {
  const decoded = extractToken(req);

  const notes = await prisma.note.findMany({
    where: { userId: decoded.id },
    orderBy: { updatedAt: 'desc' },
    include: { versions: { take: 1, orderBy: { createdAt: 'desc' } } },
  });

  return NextResponse.json({ notes });
}

async function postHandler(req: NextRequest) {
  const decoded = extractToken(req);
  const body = await parseJSON(req);
  const parsed = noteSchema.safeParse(body);

  if (!parsed.success) {
    throw new APIError(400, 'Validation failed', parsed.error.issues);
  }

  const note = await prisma.note.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      tags: JSON.stringify(parsed.data.tags || []),
      userId: decoded.id,
    },
  });

  return NextResponse.json({ note }, { status: 201 });
}

export const GET = withErrorHandling(getHandler);
export const POST = withErrorHandling(postHandler);
