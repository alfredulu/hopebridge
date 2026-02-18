# 🌉 Hopebridge Foundation

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://hopebridge-ochre.vercel.app/)
[![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Transforming Lives Through Compassion.**

**🌐 Live at:** [https://hopebridge-ochre.vercel.app/](https://hopebridge-ochre.vercel.app/)

---

## 🌟 Project Overview

Hopebridge is a **Real-Time Data Ecosystem** built with a **Backend-as-a-Service (BaaS)** architecture. The platform ensures that every contribution is tracked, visualized, and acknowledged the moment it happens. It focuses on transparency, user trust, and a frictionless "intent-to-action" pipeline for non-profit organizations.

---

## 🚀 Key Engineering Features

### ⚡ Real-Time Synchronization

- **Live Firestore Listeners**: Implemented real-time database listeners to update donation progress bars and "Recent Supporters" lists instantly across all clients without a page refresh.
- **Dynamic Category Sync**: Engineered a seamless bridge between program "Cause Cards" and the donation form. Selecting a specific cause instantly scrolls the user to the form, pre-selects the category in the dropdown, and focuses the input field for optimal UX.

### 💳 Multi-Pillar Payment Shell

- **Modular Gateway Architecture**: Designed a custom payment selector supporting Credit Card, PayPal, and Cryptocurrency flows.
- **Intelligent Donation Summary**: A real-time receipt generator that updates as the user types, providing immediate visual confirmation of their impact before they commit to the transaction.

### 🎨 High-Fidelity UI/UX

- **Pixel-Perfect Responsiveness**: Mobile-first design utilizing **Tailwind CSS** and **CSS Grid** to handle media-heavy content and interactive statistics.
- **Performance Focused**: Optimized asset delivery and component modularity, achieving rapid initial load times and smooth scroll-based interactions.

---

## 🛠️ The Tech Stack

| Layer              | Technology          | Purpose                                                         |
| :----------------- | :------------------ | :-------------------------------------------------------------- |
| **Frontend**       | **React.js (Vite)** | Component-based UI and reactive state management.               |
| **Styling**        | **Tailwind CSS**    | Modern, utility-first responsive styling and layout.            |
| **Backend (BaaS)** | **Firebase**        | Real-time database (Firestore), Authentication, and CDN Assets. |
| **Animations**     | **Canvas-Confetti** | Engaging user feedback and success celebrations.                |
| **Icons**          | **Lucide React**    | Consistent, lightweight vector iconography.                     |

---

## 📁 Project Architecture

```text
src/
├── components/         # Reusable UI (CauseCards, Buttons, Modals)
├── firebase/           # Configuration and Database export
├── pages/
│   ├── Home.jsx        # Main Engine: State management and Real-time logic
│   └── InfoPage.jsx    # Static content and programmatic details
└── App.jsx             # Shell: Routing and global layout components
```

---

## 📊 Database Schema (Cloud Firestore)

The platform manages relational data within a NoSQL environment:

- **`causes`**: Tracks program titles, fundraising goals, and current progress.
- **`donations`**: Logs donor names, timestamps, and contribution categories.
- **`gallery`**: Manages the dynamic "Moments of Hope" image feed.

---

## ⚙️ Quick Start

1. **Clone & Install**

   ```bash
   git clone https://github.com/alfredulu/hopebridge.git
   cd hopebridge
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file for local development. **Note:** These same keys must be added to your **Vercel Environment Variables** for the production site to function.

   ```env
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

3. **Launch**
   ```bash
   npm run dev
   ```

---

## 🛣️ Roadmap

- [ ] Full **NOWPayments** API integration for live crypto processing.
- [ ] Automated PDF tax receipt generation via EmailJS.
- [ ] Admin Dashboard for cause goal management and analytics.

---

## License

### MIT
