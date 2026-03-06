# Testing Guide - Personal Productivity Hub

## Quick Start (5 minutes)

### 1. Start the Server
```bash
npm run dev
```

Expected output:
```
✓ Starting...
✓ Ready in 865ms
Local: http://localhost:3000
```

### 2. Open Browser
Go to: http://localhost:3000

### 3. Test
- Click "Register"
- Create account: test@example.com / TestPassword123
- You're now logged in and on the dashboard!

---

## Testing Methods

### Method 1: Browser Testing (Easiest)

**Start here if you're new**

#### Register & Login
1. Go to http://localhost:3000/register
2. Fill in: Name, Email, Password (must be 8+ chars)
3. Click "Sign Up"
4. You'll be redirected to dashboard

#### Test Dashboard
- See your greeting with name
- See live clock
- See 4 quick access cards
- See recent activity

#### Test Notes Feature
- Click "Notes" in nav bar
- Add new note
- Write title and content
- Tags are optional
- See note in list
- Edit, delete notes

#### Test Todo Feature
- Click "Todo"
- Add task title
- Add due date (optional)
- Check/uncheck to mark complete
- Delete

#### Test Clipboard
- Click "Clipboard"
- Add text
- See in history
- Can add encrypted items

#### Test Logout
- Click "🚪" icon (door emoji)
- Back to login page
- Token is cleared

---

### Method 2: API Testing with curl (Terminal)

**For advanced testing**

#### Step 1: Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "apitest@example.com",
    "password": "TestPassword123"
  }'
```

Expected: User object with token

#### Step 2: Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "TestPassword123"
  }' -c cookies.txt
```

Note: The `-c cookies.txt` saves the token to a file

#### Step 3: Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

#### Step 4: Create a Note
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My Test Note",
    "content": "This is test content"
  }'
```

#### Step 5: Get All Notes
```bash
curl http://localhost:3000/api/notes \
  -b cookies.txt
```

#### Step 6: Create Todo
```bash
curl -X POST http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Test Task Title"
  }'
```

#### Step 7: Complete Todo
```bash
# Copy the todo ID from Step 6 response

curl -X PATCH http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "id": "PASTE_TODO_ID_HERE",
    "completed": true
  }'
```

#### Step 8: Get Dashboard Stats
```bash
curl http://localhost:3000/api/dashboard \
  -b cookies.txt
```

Response shows:
- Total notes count
- Total files count  
- Clipboard items count
- Todo stats
- Completion rate
- Recent activity

---

### Method 3: Browser Developer Tools

**To debug requests**

#### Open DevTools
- **Mac**: Cmd + Option + I
- **Windows/Linux**: F12

#### Network Tab
1. Click Network tab
2. Perform any action (create note, login, etc.)
3. See the API request appear
4. Click it to see:
   - Request headers
   - Response body
   - Status code (200, 201, 401, etc.)

#### Application Tab
1. Click Application tab
2. Cookies → See your "token"
3. Local Storage → See user data persistence
4. Check if data is being saved

#### Console Tab
1. Click Console tab
2. Try: `console.log(localStorage)` to see stored data
3. See any errors or warnings

---

### Method 4: Database Testing (Prisma Studio)

**To directly inspect database**

```bash
npx prisma studio
```

This opens: http://localhost:5555

You can:
- See all users
- See all notes, todos, clipboard items
- Manually add/edit/delete data
- View relationships between data
- Perfect for debugging

---

## Testing Checklist

### Authentication
- [ ] Register with valid email and 8+ char password
- [ ] Register fails with weak password
- [ ] Register fails with duplicate email
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Token appears in cookies
- [ ] Logout clears token and redirects

### Notes
- [ ] Create note with title
- [ ] View all notes
- [ ] Notes show newest first
- [ ] Add tags to note
- [ ] Edit note content
- [ ] Delete note
- [ ] Note persists in database

### Todo
- [ ] Create todo task
- [ ] Mark as complete
- [ ] Mark as incomplete
- [ ] Add due date
- [ ] Complete/total count updates
- [ ] Delete todo
- [ ] Todo shows in dashboard count

### Clipboard
- [ ] Add text item
- [ ] View history (last 50)
- [ ] Add encrypted item
- [ ] Shows count on dashboard
- [ ] Items are user-specific

### Files
- [ ] Add file metadata
- [ ] See file size validation (max 10MB)
- [ ] View all files
- [ ] Count shows on dashboard

### Dashboard
- [ ] Shows total counts (notes, todos, files)
- [ ] Shows completion rate
- [ ] Shows recent activity
- [ ] Live clock updates
- [ ] Greeting shows your name
- [ ] Quick access cards show

### UI/UX
- [ ] Dark theme displays correctly
- [ ] Navigation bar works
- [ ] Active page highlighted
- [ ] Loading spinners appear
- [ ] Error messages show
- [ ] Animations are smooth
- [ ] Responsive on mobile (DevTools)

### Error Handling
- [ ] Missing token → 401
- [ ] Wrong password → "Invalid email or password"
- [ ] Duplicate email → "Email already registered"
- [ ] Invalid input → validation error
- [ ] Server error → 500

---

## Common Test Scenarios

### Scenario 1: New User Flow
1. Go to http://localhost:3000
2. Click Register
3. Fill form: Name, Email, Password
4. Click Sign Up (should redirect to dashboard)
5. See greeting with your name
6. Check user in Prisma Studio

### Scenario 2: Create & Manage Notes
1. Login
2. Go to Notes
3. Create note: Title "Grocery List", Content "Milk, Bread, Eggs"
4. Add tags: "shopping, food"
5. Click Save
6. See in list
7. Create another note
8. Verify newest shows first
9. Delete one note
10. Check Prisma Studio - should show 1 note

### Scenario 3: Complete Todo
1. Go to Todo
2. Add task: "Finish project"
3. Add due date: Next week
4. Check box to mark complete
5. See completion rate change
6. Check Dashboard - stats updated

### Scenario 4: Error Handling
1. Try to register with short password
2. See error message
3. Try to login with wrong password
4. See "Invalid email or password"
5. Try to register with existing email
6. See "Email already registered"

### Scenario 5: API Testing
1. Get token with login curl command
2. Try notes endpoint with wrong token
3. See 401 error
4. Use correct token
5. See notes data

---

## Expected Responses

### Successful Login (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "name": "Test User",
    "role": "USER"
  }
}
```

### Successful Note Creation (201)
```json
{
  "note": {
    "id": "uuid",
    "title": "Title",
    "content": "Content",
    "tags": [],
    "pinned": false,
    "createdAt": "2026-03-02T...",
    "updatedAt": "2026-03-02T..."
  }
}
```

### Error Response (401)
```json
{
  "error": "Unauthorized: No token provided"
}
```

### Error Response (400)
```json
{
  "error": "Invalid email or password"
}
```

---

## Tips for Testing

1. **Use Multiple Browsers/Tabs**
   - Test simultaneouslyin different places
   - Verify data is sync'd

2. **Check the Network Tab**
   - See actual API calls
   - Verify status codes
   - Check response times

3. **Test on Mobile**
   - Open DevTools (F12)
   - Click device toolbar icon
   - Test on iPhone/Android view
   - Check responsive design

4. **Save Important Tokens**
   - Don't lose your `cookies.txt`
   - Can reuse for multiple curl requests
   - Test token expiration (7 days)

5. **Check Timestamps**
   - Verify dates are stored correctly
   - Check time format
   - Test due dates on todos

6. **Test Limits**
   - Try password < 8 chars
   - Try file > 10MB
   - Try adding 100 notes
   - Try duplicate data

---

## Troubleshooting

### Server Won't Start
```
Error: Port 3000 in use
```
→ Kill process: `lsof -ti:3000 | xargs kill -9`
→ Or use different port: `PORT=3001 npm run dev`

### Database Connection Error
```
Error connecting to database
```
→ Check DATABASE_URL in .env.local
→ Make sure PostgreSQL is running
→ Run: `npx prisma migrate dev`

### 401 Unauthorized on API
```
{"error": "Unauthorized: No token provided"}
```
→ Did you use `-b cookies.txt`?
→ Is your token expired? Get a new one with login

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
→ Requests should work from localhost:3000
→ Check Content-Type header is set

### Data Not Appearing
→ Check Prisma Studio to confirm in database
→ Refresh page to reload from server
→ Check browser console for errors (F12)

---

## Next Steps

1. **Try All Features**
   - Spend 5 minutes on each feature
   - Use both UI and API testing

2. **Check Documentation**
   - See IMPROVEMENTS.md for full checklist
   - See DEVELOPER_REFERENCE.md for commands
   - See SETUP_GUIDE.md for setup

3. **Report Issues**
   - Note what you tested
   - Note what failed
   - Check console for errors (F12)

4. **Configure for Your Needs**
   - Set up Google OAuth (optional)
   - Configure Firebase for files (optional)
   - Set up email notifications (optional)

---

**Happy Testing!** 🚀
