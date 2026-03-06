export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractToken, withErrorHandling } from '@/utils/apiHelpers';

async function handler(req: NextRequest) {
  const decoded = extractToken(req);
  const userId = decoded.id;

  // Fetch all stats in parallel
  const [totalNotes, totalFiles, clipboardActivity, todoStats, recentActivity] = await Promise.all([
    prisma.note.count({ where: { userId } }),
    prisma.file.count({ where: { userId } }),
    prisma.clipboard.count({ where: { userId } }),
    prisma.todo.findMany({
      where: { userId },
      select: { completed: true },
    }),
    prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ]);

  // Calculate todo completion
  const totalTodos = todoStats.length;
  const completedTodos = todoStats.filter((t) => t.completed).length;

  return NextResponse.json({
    stats: {
      totalNotes,
      totalFiles,
      clipboardActivity,
      totalTodos,
      completedTodos,
      completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
      recentActivity,
    },
  });
}

export const GET = withErrorHandling(handler);
