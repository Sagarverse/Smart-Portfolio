// Simple rate limiting middleware for API routes
import { NextRequest, NextResponse } from 'next/server';

const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10) * 60 * 1000; // ms
const MAX = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
const ipMap = new Map<string, { count: number; start: number }>();

export function rateLimitMiddleware(req: NextRequest) {
  const ip = (req as any).ip || req.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  const entry = ipMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }
  ipMap.set(ip, entry);
  if (entry.count > MAX) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  return NextResponse.next();
}
