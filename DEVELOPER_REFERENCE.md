# Developer Quick Reference

## Essential Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Create production build
npm start                # Run production server

# Database
npx prisma studio       # Open Prisma data editor
npx prisma migrate dev  # Run migrations
npx prisma generate     # Regenerate Prisma client
npx prisma db reset     # Reset database
```

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── [slug]/           # Dynamic routes
│   ├── layout.tsx        # Root layout
│   ├── middleware.ts     # Route middleware
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── auth/             # Auth UI
│   ├── dashboard/        # Dashboard UI
│   ├── layout/           # Layout components
│   ├── notes/            # Notes UI
│   ├── clipboard/        # Clipboard UI
│   ├── files/            # Files UI
│   └── portfolio/        # Landing page
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (Firebase, Prisma, Socket.io)
├── middleware/           # Auth & rate limiting
├── store/                # Zustand stores
├── styles/               # CSS files
├── types/                # TypeScript types
├── utils/                # Helper functions
└── config/               # App configuration
```

## Key Files

| File | Purpose |
|------|---------|
| `src/utils/apiHelpers.ts` | Centralized API error handling |
| `src/utils/zodSchemas.ts` | Input validation schemas |
| `src/store/useUserStore.ts` | User state management |
| `src/middleware/auth.ts` | JWT authentication |
| `.env.local` | Environment variables |
| `prisma/schema.prisma` | Database schema |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Current user
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/google` - Google OAuth (TODO)

### Data Management
- `GET/POST /api/notes` - Notes CRUD
- `GET/POST /api/clipboard` - Clipboard history
- `GET/POST/PATCH/DELETE /api/todo` - Todo tasks
- `GET/POST /api/files` - File management
- `GET /api/dashboard` - Dashboard stats
- `POST /api/contact` - Contact form

## Environment Variables

```dotenv
# Required
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your-secret-key

# Optional
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your@email.com
EMAIL_PASSWORD=app-password
```

## Common Tasks

### Add New API Route
1. Create file: `src/app/api/[section]/[action]/route.ts`
2. Import helpers: `import { withErrorHandling, extractToken, APIError } from '@/utils/apiHelpers'`
3. Implement handler function
4. Wrap with error handling: `export const POST = withErrorHandling(handler)`

### Create New Component
1. Create file in `src/components/[section]/`
2. Add "use client" directive for interactivity
3. Use Tailwind classes for styling
4. Import and use in page

### Add Store
1. Create file in `src/store/useXStore.ts`
2. Use `create` from zustand
3. Add `persist` middleware for localStorage
4. Import in component: `const state = useXStore((s) => s.state)`

### Database Changes
1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name description`
3. Prisma client auto-generates types

## Type Definitions

### JWT Token
```typescript
interface DecodedToken {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}
```

### API Error
```typescript
class APIError {
  statusCode: number;
  message: string;
  details?: any;
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
}
```

## Error Handling Examples

```typescript
// Good
if (!userId) {
  throw new APIError(400, 'User ID is required');
}

// Good - with Prisma errors handled
try {
  await prisma.user.create({ data });
} catch (error) {
  // withErrorHandling catches and formats automatically
}
```

## Testing API Endpoints

### With curl
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test1234"}' \
  | jq -r .token)

# Use token
curl http://localhost:3000/api/notes \
  -H "Authorization: Bearer $TOKEN"
```

### With Postman
1. Create collection
2. Add auth pre-request script:
```javascript
if (!pm.environment.get('token')) {
  // Get token first
}
pm.request.headers.add({
  key: 'Authorization',
  value: `Bearer ${pm.environment.get('token')}`
});
```

## Debugging

### Check Server Logs
```bash
# Development logs show errors immediately
npm run dev
```

### Database Issues
```bash
# Open Prisma Studio
npx prisma studio
# Visit http://localhost:5555
```

### Type Errors
```bash
# Check TypeScript
npx tsc --noEmit
```

### Network Requests
- Open DevTools (F12)
- Go to Network tab
- Check API calls and responses

## Performance Tips

1. **Limit queries**: Use `.take(n)` in Prisma
2. **Select fields**: Use `.select()` instead of fetching everything
3. **Batch operations**: Promise.all() for parallel queries
4. **Cache**: Use React cache or Zustand stores
5. **Lazy load**: Code splitting with dynamic imports

## Security Checklist

- [ ] Validate all inputs with Zod
- [ ] Check authentication with `extractToken()`
- [ ] Use HTTPOnly cookies for tokens
- [ ] Hash passwords with bcryptjs
- [ ] Prevent SQL injection (Prisma ORM)
- [ ] Add rate limiting for sensitive endpoints
- [ ] Use HTTPS in production
- [ ] Validate CORS headers

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy on git push

### Other Platforms
- Railway
- Heroku
- AWS Amplify
- DigitalOcean

See `SETUP_GUIDE.md` for detailed deployment instructions.

## Resources

- [Next.js Docs](https://nextjs.org)
- [Prisma Docs](https://prisma.io)
- [Zustand Docs](https://zustand-demo.vercel.app)
- [Zod Docs](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Support

See `IMPROVEMENTS.md` for:
- Complete testing checklist
- Known issues
- Future enhancements
- Troubleshooting guide
