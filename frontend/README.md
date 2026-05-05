# 🏛️ Visit Vagad — AI-Powered Travel Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Appwrite-22-FD366E?style=for-the-badge&logo=appwrite" />
  <img src="https://img.shields.io/badge/Gemini_AI-Google-4285F4?style=for-the-badge&logo=google" />
</p>

> An AI-powered travel discovery and planning platform for the **Vagad region** of Rajasthan, India — featuring curated local experiences, stays, a vibrant bazaar, and a smart AI travel planner.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Appwrite Setup](#appwrite-setup)
- [Author / Resume](#author--resume)

---

## 🌄 About the Project

**Visit Vagad** is a full-stack web application designed to promote tourism in the culturally rich Vagad region of Rajasthan. It allows visitors to explore destinations, browse local stays and products, book experiences, and plan their trip using a Gemini AI-powered travel assistant.

---

## ✨ Features

- 🗺️ **Destinations** — Explore top tourist attractions in the Vagad region
- 🏨 **Stays** — Browse curated accommodation options
- 🛍️ **Bazaar** — Discover local products and handicrafts
- 🎭 **Experiences** — Book unique local activities and tours
- 🤖 **AI Travel Planner** — Gemini AI-powered itinerary planning assistant
- 🔐 **Authentication** — Secure user login & registration via Appwrite
- 📱 **Responsive Design** — Mobile-first, fully responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Category        | Technology                          |
|-----------------|-------------------------------------|
| **Framework**   | Next.js 16 (App Router)             |
| **Language**    | TypeScript                          |
| **Styling**     | Tailwind CSS v4                     |
| **Backend/BaaS**| Appwrite (Auth, Database, Storage)  |
| **AI**          | Google Gemini AI (`@google/generative-ai`) |
| **UI Library**  | React 19                            |
| **Linting**     | ESLint (Next.js config)             |

---

## 📁 Project Structure

```
visit-vagad/
├── public/               # Static assets
├── scripts/
│   └── setup-appwrite.js # Appwrite DB seeding script
├── src/
│   ├── app/
│   │   ├── api/          # API route handlers
│   │   ├── auth/         # Login & registration pages
│   │   ├── bazaar/       # Local products pages
│   │   ├── destinations/ # Tourist destinations pages
│   │   ├── planner/      # AI travel planner page
│   │   ├── stays/        # Accommodation pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable UI components
│   └── lib/              # Appwrite client & utility functions
├── .env.local            # Environment variables (not committed)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- An [Appwrite](https://appwrite.io) account (Cloud or self-hosted)
- A [Google AI Studio](https://aistudio.google.com) API key for Gemini

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohitkalal01/visit-vagad.git
cd visit-vagad

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in your credentials in .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file at the project root and add:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_EXPERIENCES_COLLECTION_ID=your_collection_id
NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID=your_collection_id
NEXT_PUBLIC_APPWRITE_STAYS_COLLECTION_ID=your_collection_id

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

---

## ⚙️ Appwrite Setup

This project includes a script to automatically create and seed the Appwrite database collections:

```bash
npm run setup:appwrite
```

This script creates three collections:
- **Experiences** — Local activities and tours
- **Products** — Bazaar items and handicrafts
- **Stays** — Accommodation listings

---

## 👨‍💻 Author / Resume

<table>
<tr>
<td valign="top" width="60%">

### Mohit Kalal

📍 Udaipur, Rajasthan, India
📞 (+91) 9119369801
📧 kalalmohit003@gmail.com

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange?style=flat-square)](https://your-portfolio.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat-square&logo=github)](https://github.com/mohitkalal01)

</td>
</tr>
</table>

---

### 🧑‍💼 Profile Summary

Motivated and detail-oriented **Full-Stack Developer** with hands-on experience in **React.js, Next.js, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB**. Strong understanding of UI design, API integration, authentication, and building scalable web applications. Demonstrates problem-solving ability, clean coding practices, and a passion for learning modern technologies.

---

### 💼 Work Experience

#### React.js Developer Intern — WebSenor, Udaipur
**January 2025 – June 2025**

**Project: Zodyss – Travel Agent Portal**
- Developed the frontend for a travel management system to simplify tour bookings
- Created user-friendly interfaces to enhance the agent workflow and experience
- Collaborated with the team to build and integrate core project features
- Implemented secure user authentication and data management

---

### 🚀 Projects

#### 📝 Full-Stack Todo Application (MERN)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=flat-square&logo=github)](https://github.com/mohitkalal01)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat-square)](https://your-todo-demo.vercel.app)

- Built a secure and responsive Todo app using **React (TypeScript), Node.js, Express, and MongoDB**
- Implemented **JWT authentication**, user-specific todos with full CRUD operations, and protected routes
- Deployed frontend on **Vercel** and backend on **Render**
- **Stack:** React · TypeScript · Tailwind CSS · Node.js · Express · MongoDB · JWT

---

#### 🎬 Netflix Clone — MERN Stack
[![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=flat-square&logo=github)](https://github.com/mohitkalal01)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat-square)](https://your-netflix-demo.vercel.app)

- Built a Netflix-style streaming web app using **React, Node.js, Express, and MongoDB**
- Implemented JWT authentication, dynamic movie & TV show listing, My List, Continue Watching, and full-screen video playback
- **Stack:** React · Tailwind CSS · Node.js · Express · MongoDB · JWT

---

#### 🌐 Personal Portfolio Website
[![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=flat-square&logo=github)](https://github.com/mohitkalal01)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat-square)](https://your-portfolio.com)

- Developed a fully responsive personal portfolio website showcasing skills and projects
- Integrated smooth scrolling, interactive navigation, and mobile-first design
- **Stack:** JavaScript · HTML · Bootstrap

---

### 🛠️ Technical Skills

| Category                   | Technologies                                          |
|----------------------------|-------------------------------------------------------|
| **Languages**              | JavaScript, TypeScript                                |
| **Frontend**               | Next.js, React.js, HTML, CSS, Tailwind CSS, jQuery, Bootstrap |
| **Backend**                | Node.js, Express.js                                   |
| **Database**               | MongoDB (Mongoose)                                    |
| **BaaS**                   | Appwrite                                              |
| **AI/ML**                  | Google Gemini AI                                      |
| **Tools**                  | Git, GitHub, VS Code, Postman                         |

---

### 🏆 Certifications

- 📜 **JavaScript Projects** — Great Learning *(Functions, Loops, Arrays, Objects)*
- 📜 **Developer and Technology Job Simulation** — Accenture UK

---

### 🎓 Education

| Degree | Institution | Year |
|--------|------------|------|
| **MCA** — Master of Computer Application (IT) | Bharati Vidyapeeth Deemed University, Pune | 2025 – 2027 *(Ongoing)* |
| **B.Sc.** — Bachelor of Science | Pandit Deendayal Upadhyaya Shekhawati University, Sikar, Rajasthan | 2020 – 2023 |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/mohitkalal01">Mohit Kalal</a> | Showcasing the beauty of Vagad, Rajasthan 🏛️</p>
