StockSync – Inventory Management System

StockSync is a modern web-based inventory management system designed to help material businesses and small industries track stock levels, monitor alerts, and analyze inventory performance from a centralized dashboard.

The application is built with React, TypeScript, and Supabase, following a clean multi-user architecture with secure data isolation.

Project Overview:

StockSync provides a structured and scalable solution for managing:
Inventory items
Categories
Stock levels
Alerts
Performance analytics

Each user has their own isolated workspace. When a new user signs up, their categories and inventory will initially be empty by design. This ensures secure, user-specific data management suitable for real-world deployment.

Features:

Secure user authentication (Sign Up / Login)
User-specific inventory management
Add, view, update, and search inventory items
Category-based stock organization
Dashboard with key inventory metrics
Low-stock and critical alerts
Analytics including:
       Inventory turnover
       Stock aging
Responsive and clean UI

Technology Stack:

Frontend Setup: Vite + React
UI & Styling: Tailwind CSS, shadcn/ui
State & Data Fetching: React Query
Backend & Database: Supabase
Authentication: Supabase Auth
Data Visualization: Recharts
Icons: Lucide Icons


Project Structure
src/
├── components/        # Reusable UI and layout components
├── pages/             # Application pages (Dashboard, Inventory, Alerts, Analytics)
├── hooks/             # Custom hooks for data fetching and logic
├── lib/               # Utility functions and helpers
├── styles/            # Global styles
└── App.tsx            # Application entry point

Local Setup

Prerequisites
Node.js (v16 or later)
npm

# Clone the repository
git clone https://github.com/shivii2005/stocksync

# Navigate into the project directory
cd stocksync

# Install dependencies
npm install

# Start development server
npm run dev

The application runs at:
http://localhost:5173

Architecture

The system follows a client–server architecture:
React frontend handles UI and interaction.
Supabase manages authentication and database operations.
Row-Level Security (RLS) ensures each user can only access their own data.
React Query manages caching and synchronization.


Assumptions:

Users have access to a basic digital device and stable internet connectivity.
Inventory data is entered accurately into the system.
Users follow standard inventory handling practices.

Conclusion:
This inventory management system provides an organized and technology-driven approach to handling inventory operations. By integrating tracking, alerts, and analytics, it supports efficient inventory management and informed operational decisions.