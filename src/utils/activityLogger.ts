// Utility to log user activity
import { prisma } from '../lib/prisma';

export async function logActivity(userId: string, action: string, meta?: string) {
  await prisma.activityLog.create({
    data: {
      userId,
      action,
      meta,
    },
  });
}
