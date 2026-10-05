<div align="center">

  ![Capsule Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,100:1D9BF0&height=180&section=header&text=Chirp%20Social%20Media&fontSize=42&animation=twinkling&desc=Full-Featured%20React.js%20%26%20Tailwind%20CSS%20Twitter-Inspired%20Platform)

  <br/>

  [![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

<br/>

## 📱 Overview

**Chirp** is a modern, full-featured Twitter/X-inspired social media web application engineered with **React 18**, **Tailwind CSS v4**, and **Vite**. It features a complete feed mechanism with dual timeline filters ("For you" and "Following"), rich post composer, interactive hashtag parsing, real-time simulated background user interactions, bookmarking, profile editing, and theme persistence.

---

## ✨ Key Features

- ✍️ **Post Composer & Feed Management**: Create posts, tag content, reply to threads, and seamlessly switch between global ("For You") and "Following" feeds.
- 🏷️ **Hashtags & Explore Search**: Automatic `#hashtag` extraction, real-time trending topics sidebar, and dedicated tag filter explore view.
- 👤 **User Profiles & Relationships**: Customizable user profile details (avatar, name, bio), follow/unfollow capability, and user activity timelines.
- 🔔 **Simulated Real-Time Engagement**: Intelligent background interaction engine that triggers incoming like notifications and updates alerts dynamically.
- 🔖 **Bookmarks & Notifications**: Save posts for later reading with standard bookmark toggles and inspect read/unread notification activity feed.
- 🌙 **Dark & Light Mode**: Persistent theme toggling across application components with smooth Tailwind dark mode styling.

---

## 🛠️ Project Structure

```
Social Media/
├── public/                 # Static assets & HTML entry point
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Avatar.jsx      # User avatar component with fallback
│   │   ├── Composer.jsx    # Post & reply composer text area
│   │   ├── FollowButton.jsx# Dynamic follow/unfollow button
│   │   ├── Layout.jsx      # Main application layout with sidebars & navigation
│   │   ├── TweetCard.jsx   # Tweet display card with like, bookmark, reply actions
│   │   └── WhoToFollow.jsx # Suggested accounts sidebar module
│   ├── pages/              # Application route views
│   │   ├── Bookmarks.jsx   # Saved tweets view
│   │   ├── Explore.jsx     # Hashtag discovery & post search page
│   │   ├── Home.jsx        # Primary feed timeline (For You / Following)
│   │   ├── Notifications.jsx # Activity alerts & interaction logs
│   │   ├── Profile.jsx     # User profile page & profile editing modal
│   │   └── TweetDetail.jsx # Thread detail view with parent & reply chains
│   ├── utils/
│   │   └── format.js       # Relative timestamp formatting & hashtag parsing
│   ├── api.js              # LocalStorage mock backend data persistent layer
│   ├── App.jsx             # React Router routing configuration
│   ├── index.css           # Global Tailwind CSS styles & design tokens
│   ├── main.jsx            # Application entry point
│   └── store.jsx           # Global Context API state provider & action hooks
├── index.html              # Main HTML markup
├── package.json            # Dependencies & script configurations
├── vite.config.js          # Vite build options & plugins
└── README.md               # Documentation & overview
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### Installation & Execution

```bash
# Clone the repository
git clone https://github.com/AahelGupta/Social-Media.git

# Navigate into the project directory
cd Social-Media

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
