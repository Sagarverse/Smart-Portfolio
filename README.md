# Personal Productivity Hub

A full-stack, production-ready personal productivity web application with portfolio, real-time clipboard sync, notes, file storage, and more.

---

## 👤 About Me

**Sagar M**  
Bengaluru, Karnataka 562112  
📞 +91 9019989269  
✉️ sagisagar1974@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sagar-m-32aa951b4) | [GitHub](https://github.com/sgrkannada)

### 🎯 Career Objective
Motivated **Data Science** student seeking an **entry-level role** to apply **Python** and **software skills** in **AI-driven projects**, solving real-world problems while contributing to company growth.

### 📝 Professional Summary
Data Science student skilled in **Python, SQL, and C**, with hands-on experience in **AI and IoT solutions**.  
🏆 Winner – Udaya 1.0 Hackathon and NASA Space Apps Challenge Global Nominee.  
Recognized for innovation, adaptability, and teamwork in building AI-powered real-world projects.

### 🎓 Education
- **B.Tech in Data Science** — Dayananda Sagar University, Bengaluru *(Expected 2027)*
- **PUC** — Sri Sapthagiri PU College *(2021–2023, 91.3%)*
- **SSLC** — Karnataka Public School *(2018–2021, 95.4%)*

### 💻 Technical Skills
- **Programming:** Python, SQL, C, Java, JavaScript, HTML/CSS, Dart
- **Frameworks:** Flutter, Android Studio, React.js, Node.js, Express.js, Bootstrap
- **Data Science:** Pandas, NumPy, Scikit-learn, TensorFlow (Basic), Jupyter, MATLAB
- **Databases:** MySQL
- **Cloud & Tools:** Microsoft Azure, Git, GitHub, VS Code
- **Creative Tools:** MS Office, Adobe Photoshop, Adobe Premiere Pro

### 🚀 Projects & Achievements
- **Udaya 1.0 Hackathon Winner** — Rs.15,000 (AgriConnect – AI Agriculture)
- **NASA Space Apps Challenge** — Global Nominee (Recycle in Mars)
- **DSU DevHack 2.0** — $1000 Vultr Cloud Credit Winner
- **YUVAI Initiative** — Top 50 National Participant (AI Social Impact)
- **NTT Data Trainee** — Skill Enhancement Program
- Developed **10+ Cross-platform apps** using Flutter and Android Studio

### 📜 Certifications
- **Microsoft Azure DP-900: Azure Data Fundamentals**
- **Oracle AI Foundation Certificate**
- **Oracle Data Science Professional**
- Snowflake for Developers – Udemy
- Industrial IoT for Automation
- SQL for Beginners & Advanced SQL

### 🤝 Soft Skills
Adaptability, Leadership, Team Work, Time Management, Dedication, Discipline, Creative Problem Solving, Communication

---

## Tech Stack

## Features

## Setup

1. **Clone the repo & install dependencies:**
	```sh
	npm install
	```
2. **Configure environment variables:**
	- Copy `.env.example` to `.env` and fill in your secrets.
3. **Set up PostgreSQL & Prisma:**
	```sh
	npx prisma migrate dev --name init
	npx prisma generate
	```
4. **Run the development server:**
	```sh
	npm run dev
	```
5. **Deploy:**
   - Deploy to Netlify (see instructions below) or your preferred platform.

## Folder Structure
1. Push your project to GitHub.
2. In Netlify, create a new site from Git and select your repo.
3. Build command: `npm run build`
4. Publish directory: leave empty (Next.js plugin handles this)
5. Add environment variables in Netlify dashboard (from your `.env` file):
   - `DATABASE_URL`, `JWT_SECRET`, Firebase keys, Google OAuth keys, email vars, etc.
6. Deploy!
7. Edit code locally, push to GitHub, Netlify auto-redeploys.
8. For env var changes, update them in Netlify dashboard and redeploy.
- `/src/app/api` — API routes (auth, clipboard, notes, files, dashboard)
- `/src/components` — UI components
- **Login Modal for Guests:**
  - Unauthenticated users see a dismissible login popup on landing page.
  - Modal can be closed for guest viewing, reappears next session until login.
- **Clipboard Sync Across Devices:**
  - Real-time clipboard sync using Socket.io.
  - Sign in with the same account on multiple devices to instantly sync clipboard history.
- `/src/hooks` — Custom hooks
- `/src/store` — Zustand stores

## License
- `/src/lib` — Prisma, Firebase, Socket.io, etc.
