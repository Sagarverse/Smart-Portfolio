import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractToken, parseJSON, withErrorHandling, APIError } from '@/utils/apiHelpers';

async function getHandler(req: NextRequest) {
  const decoded = extractToken(req);

  const todos = await prisma.todo.findMany({
    where: { userId: decoded.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ todos });
}

async function postHandler(req: NextRequest) {
  const decoded = extractToken(req);
  const body = await parseJSON(req);

  const { title, dueDate } = body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    throw new APIError(400, 'Title is required');
  }

  const todo = await prisma.todo.create({
    data: {
      title: title.trim(),
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: decoded.id,
    },
  });

  return NextResponse.json({ todo }, { status: 201 });
}

async function patchHandler(req: NextRequest) {
  const decoded = extractToken(req);
  const body = await parseJSON(req);

  const { id, completed, title, dueDate } = body;

  if (!id || typeof id !== 'string') {
    throw new APIError(400, 'Todo ID is required');
  }

  const todo = await prisma.todo.update({
    where: { id, userId: decoded.id },
    data: {
      ...(completed !== undefined && { completed }),
      ...(title !== undefined && { title }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
    },
  });

  return NextResponse.json({ todo });
}

async function deleteHandler(req: NextRequest) {
  const decoded = extractToken(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    throw new APIError(400, 'Todo ID is required');
  }

  await prisma.todo.delete({
    where: { id, userId: decoded.id },
  });

  return NextResponse.json({ success: true });
}

export const GET = withErrorHandling(getHandler);
export const POST = withErrorHandling(postHandler);
export const PATCH = withErrorHandling(patchHandler);
export const DELETE = withErrorHandling(deleteHandler);
