# 📦 Assignment-12

A modern full-stack web application built with **React 19**, **Vite**, **Tailwind CSS**, and **Firebase**, featuring payment integration via **Stripe**, data fetching via **TanStack React Query**, and interactive UI with **Framer Motion**.

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, React Hook Form, Recharts, Swiper.js
- **State/Data**: TanStack React Query, Axios
- **Authentication**: Firebase
- **Payment**: Stripe.js + React Stripe.js
- **Date Handling**: Date-fns
- **Icons**: Lucide-react, React Icons

---

## 📂 Folder Structure

src/
├── components/ # Reusable UI components
├── pages/ # Route-based pages
├── hooks/ # Custom hooks (e.g. useAuth, useAxiosSecure)
├── layouts/ # Layout components (Dashboard, Main, etc.)
├── assets/ # Static images/icons
└── main.jsx # App entry point

yaml
Copy
Edit

---

## ⚙️ Installation

```bash
# Clone the project
git clone https://github.com/your-username/assignment-12.git
cd assignment-12

# Install dependencies
npm install

# Run locally
npm run dev
Make sure you have Node.js (v18+) and npm installed.

🔐 Environment Variables
Create a .env file in the root and add your Firebase & Stripe keys:

env
Copy
Edit
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
🧪 Available Scripts
Command	Description
npm run dev	Start development server (Vite)
npm run build	Build app for production
npm run preview	Preview the production build locally
npm run lint	Run ESLint for code quality

📸 Features
🔐 Firebase Authentication (Email, Google, GitHub)

🛒 Secure Stripe Payments

📊 Interactive Data Charts with Recharts

⭐ Market Reviews & Watchlist

🗓️ Mood & Price Tracking with Date-fns

🌙 Dark mode ready

📱 Fully Responsive UI

📌 Dependencies Summary
React 19

Vite 7

Tailwind CSS 4

React Router 7

React Hook Form

Stripe (client-side)

Firebase SDK

React Hot Toast

TanStack Query v5

Framer Motion

Date-fns

Recharts, Swiper

📞 Contact
For any queries or help, feel free to reach out via GitHub or open an issue.

Built with ❤️ by [Your Name]

yaml
Copy
Edit

---

### ✅ Instructions

- Replace `your-username` and `Your Name` with your GitHub username or actual name.
- Place this in the root of your project as `README.md`.

If you want I can also **generate README with badges**, or automatically detect more features based on your actual codebase. Let me know!







live-link: https://assignment-12-52342.web.app/