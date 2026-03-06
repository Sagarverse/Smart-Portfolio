// Utility for better error handling and type-safe JWT operations
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Extract and verify JWT token from request
 * @param req - NextRequest object
 * @returns Decoded token with user info
 * @throws APIError if token is invalid or missing
 */
export function extractToken(req: NextRequest): DecodedToken {
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new APIError(401, 'Unauthorized: No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded.id || !decoded.email) {
      throw new APIError(401, 'Invalid token payload');
    }
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new APIError(401, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new APIError(401, 'Invalid token');
    }
    throw error;
  }
}

/**
 * Safe wrapper for API route handlers
 * @param handler - The handler function
 * @returns NextResponse with error handling
 */
export function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('[API Error]', error);

      if (error instanceof APIError) {
        return NextResponse.json(
          {
            error: error.message,
            ...(process.env.NODE_ENV === 'development' && { details: error.details }),
          },
          { status: error.statusCode }
        );
      }

      // Handle Prisma errors
      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
        const prismaError = error as any;
        if (prismaError.code === 'P2002') {
          return NextResponse.json(
            { error: 'A record with this value already exists' },
            { status: 409 }
          );
        }
        if (prismaError.code === 'P2025') {
          return NextResponse.json(
            { error: 'Record not found' },
            { status: 404 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Parse and validate JSON body
 * @param req - NextRequest object
 * @returns Parsed JSON body
 */
export async function parseJSON(req: NextRequest) {
  try {
    return await req.json();
  } catch (error) {
    throw new APIError(400, 'Invalid JSON body');
  }
}
