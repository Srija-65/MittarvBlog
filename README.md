# MittarvBlog ✨  

A full-stack **Blog Publishing Platform** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
The platform allows users to **authenticate, create posts, interact (likes, comments, bookmarks), and manage profiles** with a sleek UI and **dark mode support**.  

## 🚀 Features  

- 🔐 Google OAuth login  
- 📝 Blog post CRUD (create, read, update, delete)  
- 💬 Comments  
- ❤️ Likes  
- 📌 Bookmarks  
- 👤 Profile setup (bio, profile picture)  
- 🌗 Dark/Light mode toggle  
- 🔍 Search posts by tags & titles  
- 📱 Responsive Tailwind UI  

---

## 📂 Project Structure  

```
MittarvBlog/
│── backend/                 # Node.js + Express API
│   ├── controllers/         # User, Post, Comment controllers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── server.js            # API entrypoint
│   └── .env.example         # Backend environment variables
│
│── frontend/                # React (Vite) client
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page-level components
│   │   ├── redux/           # Redux Toolkit slices
│   │   ├── App.jsx          # Main app
│   │   ├── main.jsx         # React root
│   │   └── index.css        # Tailwind styles
│   ├── tailwind.config.js   # Tailwind theme
│   └── vite.config.js       # Vite config
│
├── README.md
├── package.json
└── .gitignore
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/your-username/MittarvBlog.git
cd MittarvBlog
```

### 2️⃣ Backend Setup  
```bash
cd backend
npm install
```

Create `.env` file (copy from `.env.example`):  
```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
```

Run backend:  
```bash
npm run dev
```

### 3️⃣ Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints  

### Auth  
- `GET /api/auth/google` → Google login  
- `GET /api/auth/logout` → Logout  

### Posts  
- `GET /api/posts` → Get all posts  
- `POST /api/posts` → Create new post  
- `GET /api/posts/:id` → Get single post  
- `PUT /api/posts/:id` → Update post  
- `DELETE /api/posts/:id` → Delete post  
- `POST /api/posts/:id/like` → Like post  
- `POST /api/posts/:id/unlike` → Unlike post  

### Comments  
- `POST /api/posts/:id/comments` → Add comment  
- `GET /api/posts/:id/comments` → Fetch comments  

### Users  
- `GET /api/users/me` → Get my profile  
- `PUT /api/users/me` → Update my profile  
- `GET /api/users/:id` → View user profile  
- `POST /api/users/bookmarks/:postId` → Bookmark post  
- `DELETE /api/users/bookmarks/:postId` → Remove bookmark  
- `GET /api/users/bookmarks` → Get all bookmarks  

---

## 🛠️ Tech Stack  

**Frontend**: React (Vite), Redux Toolkit, TailwindCSS  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  
**Auth**: Google OAuth2 + JWT  
**Others**: dotenv, axios, bcrypt  

---

## 🤖 Use of AI  

This project was built with the assistance of **AI tools (ChatGPT, Copilot, Cursor)** for:  
- Generating boilerplate (controllers, routes, Redux slices)  
- UI/UX improvements (color themes, gradients, dark mode toggle)  
- Debugging API & state issues  
- Writing documentation (README, comments)  

---

## 📌 Contribution  

1. Fork the repo  
2. Create branch `feature/xyz`  
3. Commit changes  
4. Push and open PR  
