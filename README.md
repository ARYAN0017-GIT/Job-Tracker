JobTracker is a modern, high-performance Single Page Application (SPA) built with React. It is designed to streamline the job application process by providing a clean, responsive dashboard to track companies, roles, and interview statuses.

This project was built with a heavy focus on performance optimization, scalable state management, and premium UI/UX mechanics.

🛠️ Tech Stack & Architecture
Frontend Framework: React (with Vite)

Routing: React Router v6 (Client-side routing for lightning-fast page transitions)

State Management: React Context API (Global data vault)

Data Persistence: Browser localStorage (Cache management)

Styling: Custom CSS (Material Design 3 principles)

✨ Key Technical Features
Global Context Architecture: Replaced legacy prop-drilling by engineering a JobProvider Context, cleanly separating data logic from UI components.

Optimized Filtering Math: Utilized React's useMemo hook to chain complex filtering logic (Live Search + Status Chips + A-Z/Date Sorting) without causing unnecessary re-renders.

Smart Elliptical Pagination: Built a custom algorithmic pagination component from scratch that mathematically shifts active pages and ellipses (e.g., 1 ... 4 5 6 ... 10) to handle large datasets efficiently.

Premium UI/UX: Features a custom slide-out side-panel for data entry, an interactive Floating Action Button (FAB) menu, dynamic chip counters that instantly recalculate on search, and a persistent Dark/Light theme toggle.

🗺️ Next Steps (Phase 3 Roadmap)
This repository represents the completed Frontend architecture. Phase 3 (currently in development) will detach the app from LocalStorage and connect it to a full backend architecture featuring:

Node.js & Express.js REST API

MongoDB Atlas for permanent cloud storage

Automated Gmail API synchronization to automatically detect and log new job applications.