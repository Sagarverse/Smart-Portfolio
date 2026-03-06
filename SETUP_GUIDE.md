# Setup & Development Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (local or cloud)
- Git

## Quick Start

### 1. Environment Setup

```bash
# Copy the example environment file and configure it
cp .env.example .env.local
```

Then edit `.env.local` and fill in your configuration:

```dotenv
# Essential Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/productivity_hub"
JWT_SECRET="your-secret-key-here"  # Generate: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NODE_ENV="development"

# Optional: Google OAuth (for authentication)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"

# Optional: Firebase (for file storage)
NEXT_PUBLIC_FIREBASE_API_KEY="your-key"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"

# Optional: Email Configuration (for notifications)
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with test data
npx prisma db seed
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

## Features Overview

### Authentication
- **Email/Password Auth**: Register and login with credentials
- **JWT Tokens**: Secure token-based authentication
- **Google OAuth**: Sign in with Google (optional)
- **Session Management**: Automatic token refresh and persistence

### Core Features

#### 📝 Notes
- Create, edit, and delete notes
- Full markdown support
- Tag organization
- Version history
- Real-time sync

#### 📋 Clipboard
- Sync clipboard across devices
- Encryption support
- History tracking
- Quick paste from history

#### 📁 Files
- Upload and manage files
- File preview
- Download files
- Set expiration dates
- Firebase Cloud Storage integration

#### ✅ Todo
- Create and manage tasks
- Mark complete/incomplete
- Set due dates
- Priority levels
- Real-time updates

#### 📊 Dashboard
- Overview of all your data
- Activity timeline
- System status
- Quick access links

## Testing Features

### Authentication Flow
```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### Protected Routes
All API routes under `/api/auth/*` (except register) require authentication:

```bash
# Get current user info
curl -X GET http://localhost:3000/api/auth/me \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Notes API
```bash
# Create a note
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Note",
    "content": "Note content",
    "tags": ["tag1", "tag2"]
  }'

# Get all notes
curl -X GET http://localhost:3000/api/notes \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Clipboard API
```bash
# Add to clipboard history
curl -X POST http://localhost:3000/api/clipboard \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "text": "Clipboard content",
    "encrypted": false
  }'

# Get clipboard history
curl -X GET http://localhost:3000/api/clipboard \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Todo API
```bash
# Create a todo
curl -X POST http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "title": "Task title",
    "dueDate": "2024-12-31T23:59:59Z"
  }'

# Update todo
curl -X PATCH http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "id": "todo-id",
    "completed": true
  }'

# Delete todo
curl -X DELETE "http://localhost:3000/api/todo?id=todo-id" \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Files API
```bash
# Upload file metadata
curl -X POST http://localhost:3000/api/files \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "name": "document.pdf",
    "url": "https://storage.url/file.pdf",
    "type": "application/pdf",
    "size": 1024
  }'

# Get all files
curl -X GET http://localhost:3000/api/files \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Dashboard API
```bash
# Get dashboard stats
curl -X GET http://localhost:3000/api/dashboard \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

## Running Tests

```bash
# Run tests (if configured)
npm run test

# Run tests in watch mode
npm run test:watch
```

## Building for Production

```bash
# Create production build
npm run build

# Run production server
npm start
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL is correct
- Check database exists: `psql -l`

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

### Prisma Errors
```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

### Environment Variables Not Loading
- Ensure `.env.local` exists in the root directory
- Restart the dev server after changing `.env.local`
- Do not commit `.env.local` to version control

## Security Checklist

- ✅ JWT secrets are strong and unique
- ✅ Database passwords are secure
- ✅ CORS is properly configured
- ✅ Input validation is implemented
- ✅ Rate limiting is enabled
- ✅ HTTPS is used in production
- ✅ Secrets are never committed to Git

## API Documentation

All API responses follow this format:

**Success (200-201):**
```json
{
  "data": { ... }
}
```

**Error (4xx-5xx):**
```json
{
  "error": "Error message",
  "details": { ... }
}
```

## Support

For issues or questions, please check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Project README](./README.md)
