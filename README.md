Inventory Management System

A web-based inventory management system designed to help material businesses track stock levels, monitor
alerts, and analyze inventory performance through a centralized dashboard.

Project Overview:

This project provides a structured solution for managing inventory operations such as stock tracking, alert handling, 
and performance analysis. It is built with a modern frontend stack and integrates real-time data handling to support 
efficient inventory management.

Key objectives of the system include:

1. Improving visibility into inventory levels
2. Identifying low stock and dead stock items
3. Providing analytical insights for better decision-making

Features:

User authentication (sign up and login)
Inventory management (add, view, and search items)
Dashboard with key inventory metrics
Alerts for low stock and critical conditions
Analytics including inventory turnover, stock aging, and ABC analysis
Responsive and clean user interface

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

Getting Started (Local Setup)
Prerequisites

Node.js (v16 or later)

npm

Installation Steps
# Clone the repository
git clone https://github.com/kamalmeena20/StockSync

# Navigate to the project directory
cd StockSync|Insyd AI

# Install dependencies
npm install

# Start the development server
npm run dev


The application will start locally with hot reloading enabled.

*System Architecture (High-Level):

The system follows a client–server architecture where a React-based frontend interacts with 
backend services for authentication, inventory data management, alerts, and analytics. 
All data is centrally managed to ensure consistency and real-time updates.


Assumptions:

Users have access to a basic digital device and stable internet connectivity.
Inventory data is entered accurately into the system.
Users follow standard inventory handling practices.

Conclusion:
This inventory management system provides an organized and technology-driven approach to handling inventory operations. By integrating tracking, alerts, and analytics, it supports efficient inventory management and informed operational decisions.