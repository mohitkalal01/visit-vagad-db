# Visit Vagad 🏜️🛶🏛️

Visit Vagad is a modern, full-stack tourism platform designed to showcase the rich tribal heritage, rural homestays, and handcrafted products of the Vagad region (Banswara & Dungarpur, Rajasthan).

## 🚀 Key Features

- **🏠 Vagad Stays:** Authentic rural homestays with verified "Paryatan Mitra" hosts.
- **🛍️ Bhil Bazaar:** A digital marketplace for authentic tribal crafts and textiles.
- **✨ AI Itinerary Planner:** Powered by Gemini AI to create personalized 1-5 day trip plans.
- **🏨 Secure Booking:** Integrated reservation system for stays and product orders.
- **👤 User Profiles:** Manage bookings, reviews, and personal preferences.
- **📊 Admin Dashboard:** Complete control center for managing stays, orders, and users.

## 🏗️ Architecture

The project follows a **Decoupled Architecture** for maximum scalability and professional organization:

- **Frontend:** Next.js 15+ (App Router) focused on premium UI/UX and client-side logic.
- **Backend:** Next.js API Routes acting as a standalone backend server with a **Controller Pattern** for clean business logic.

## 🛠️ Tech Stack

- **Frontend:** React, Next.js, Vanilla CSS (Premium Design System), Lucide Icons.
- **Backend:** Node.js, Next.js API Routes, JWT (Auth), `jose` (Edge Middleware).
- **Database:** MongoDB Atlas with Mongoose ODM.
- **AI Integration:** Google Gemini AI (Generative-AI SDK).

## 🏃 How to Run Locally

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env.local with:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# GEMINI_API_KEY=your_gemini_key
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
npm run dev
```

## 🧹 Project Structure

```text
visit-vagad-fronend/
├── frontend/             # Next.js UI Application
│   ├── src/components/   # Reusable UI components
│   ├── src/app/          # Main pages and routing
│   └── src/context/      # Auth & Global state
├── backend/              # Standalone API Server
│   ├── controllers/      # Business logic (Express style)
│   ├── models/           # Mongoose schemas
│   ├── app/api/          # API route definitions
│   └── proxy.ts          # Modern Auth Middleware
└── .gitignore            # Git exclusion rules
```

## 📝 License
This project is built for the development of Vagad Tourism. All rights reserved.
