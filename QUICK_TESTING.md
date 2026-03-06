# Quick Testing Commands

## One-Command Start
```bash
# Terminal 1: Start server
npm run dev

# Open browser
http://localhost:3000
```

## Quick Browser Test (2 minutes)
```
1. Register: test@test.com / TestPassword123
2. Login
3. Click "Dashboard" → See stats
4. Click "Notes" → Create note
5. Click "Todo" → Add task
6. Click "🚪" → Logout
```

## Terminal API Testing (Keep server running, new terminal)

### 1. Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"api@test.com","password":"Test1234"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"Test1234"}' -c cookies.txt
```

### 3. Create Note
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test","content":"Content here"}'
```

### 4. Get Notes
```bash
curl http://localhost:3000/api/notes -b cookies.txt
```

### 5. Create Todo
```bash
curl -X POST http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Task 1"}'
```

### 6. Get Dashboard
```bash
curl http://localhost:3000/api/dashboard -b cookies.txt
```

## Database Viewer (New terminal)
```bash
npx prisma studio
# Opens: http://localhost:5555
```

## Error Testing
```bash
# Wrong password
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"wrong"}'
# Expected: 401 "Invalid email or password"

# Missing token
curl http://localhost:3000/api/notes
# Expected: 401 "Unauthorized: No token provided"

# Duplicate email
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"api@test.com","password":"Test1234"}'
# Expected: 409 "Email already registered"

# Weak password
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"new@test.com","password":"short"}'
# Expected: 400 Validation error
```

## Browser DevTools Testing (F12)

### Network Tab
- Perform action
- Find API request
- Click to view:
  - Request/Response
  - Status code
  - Headers
  - Timing

### Application Tab
- Cookies → Find "token"
- Local Storage → Check user persistence

### Console Tab
```javascript
// View stored data
console.log(localStorage)
```

## Quick Checklist
- [ ] Register works
- [ ] Login works  
- [ ] Dashboard shows
- [ ] Create note
- [ ] Create todo
- [ ] Error handling works
- [ ] Logout works
- [ ] Token in cookies
- [ ] Data in database

## Stop Everything
```bash
# Kill dev server
Ctrl+C

# Kill Prisma Studio
Ctrl+C
```

## Common Issues

| Issue | Fix |
|-------|-----|
| "Port already in use" | `lsof -ti:3000 \| xargs kill -9` |
| "Unauthorized" | Use `-b cookies.txt` in curl |
| "Cannot connect to DB" | Check DATABASE_URL in .env.local |
| "Type error" | Run `npx prisma generate` |
| "404 Not Found" | Use correct URL: http://localhost:3000 |

---

**Next**: See TESTING_GUIDE.md for detailed testing instructions
