# 🛍️ AURA — Modern MERN Stack E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-v4.18-black?logo=express)
![React](https://img.shields.io/badge/React-v18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-v4.4-purple?logo=vite)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack, feature-rich MERN (MongoDB, Express, React, Node.js) E-Commerce application designed with modern glassmorphism UI, smooth micro-animations, real-time cart interactions, role-based access control, user authentication, and admin management.

---

## ✨ Features

- 🌟 **Modern & Responsive UI**: Built with React 18 and Vite for fast load times, dynamic micro-interactions, dark aesthetic, and sleek glassmorphism visual design.
- 🔐 **Authentication & Security**: Secure JWT authentication with bcrypt password hashing, login/signup modals, and role-based route protection.
- 📦 **Product Catalog & Filtering**:
  - Filter by Categories (Electronics, Fashion, Home & Living, Fitness, etc.)
  - Search by product titles & descriptions
  - Price range slider and rating filters
  - Detailed product view modals with stock indicators
- 🛒 **Slide-out Cart Drawer**:
  - Add/remove items and adjust quantities seamlessly
  - Real-time subtotal and tax calculation
  - Dynamic free shipping progress bar indicator
- 💳 **Checkout & Payments**:
  - Interactive multi-step checkout modal
  - Shipping address form validation and order confirmation
- 📜 **Order Tracking & History**: View past orders, items purchased, shipping statuses, and order totals.
- 👑 **Admin Management Panel**:
  - Add, edit, or delete catalog products
  - View user orders and update order status (Processing, Shipped, Delivered)
  - Manage stock levels and product categories
- ⚡ **Concurrent Dev Server**: Launch backend and frontend simultaneously with a single terminal command.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Lucide React Icons, Custom Responsive CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ORM (or MongoDB Memory Server for dev/testing) |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Payment Integration** | Stripe API (Ready integration structure) |
| **Development Tools** | Nodemon, Concurrently, Jest |

---

## 📂 Project Structure

```text
Project-1-MERN-ECommerce/
├── client/                   # React Frontend (Vite)
│   ├── src/
│   │   ├── components/       # UI Components (Navbar, CartDrawer, AuthModal, etc.)
│   │   ├── App.jsx           # Main Application Container & State Manager
│   │   ├── main.jsx          # App Entry Point
│   │   └── index.css         # Custom Design Tokens & Global Styles
│   ├── index.html            # Vite HTML Template
│   ├── vite.config.js        # Vite Configuration & Proxy Setup
│   └── package.json          # Frontend Dependencies
├── middleware/               # Express Auth & RBAC Middleware
├── models/                   # Mongoose Data Models (User, Product, Order)
├── routes/                   # REST API Endpoints (auth, products, orders, users)
├── seedData.js               # Database Pre-population Script
├── server.js                 # Express Backend Server Entry
├── .env.example              # Environment Variables Template
├── .gitignore                # Git Exclusions
├── package.json              # Backend Dependencies & Scripts
└── README.md                 # Project Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://localhost:27017` (or a MongoDB Atlas connection URI)

### 2. Installation

Clone the repository and install root dependencies:

```bash
git clone https://github.com/krishnamnamithaa/Mern-E-Commerce-.git
cd Mern-E-Commerce-
npm install
```

Install frontend client dependencies:

```bash
cd client
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Configure your environment variables in `.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

---

## 🏃 Running the Application

### Seed Initial Sample Data

Populate the database with sample products and demo accounts:

```bash
npm run seed
```

### Start Backend & Frontend Concurrently

Run both the Express API server (Port `5000`) and the Vite React frontend (Port `3000`) with a single command:

```bash
npm run dev:full
```

Open your browser and navigate to: **`http://localhost:3000`**

### Individual Development Commands

- **Backend Server Only**: `npm run dev`
- **Frontend Client Only**: `npm run client`
- **Run Backend Unit Tests**: `npm test`

---

## 📡 API Endpoints Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate user and return JWT token
- `GET /api/auth/me` — Get current logged-in user profile

### Products (`/api/products`)
- `GET /api/products` — Get all products (supports search, category, price filtering)
- `GET /api/products/:id` — Get single product details
- `POST /api/products` — Create new product (Admin required)
- `PUT /api/products/:id` — Update product details (Admin required)
- `DELETE /api/products/:id` — Delete product (Admin required)

### Orders (`/api/orders`)
- `POST /api/orders` — Create a new order
- `GET /api/orders/my-orders` — Fetch logged-in user's order history
- `GET /api/orders` — Fetch all orders (Admin required)
- `PUT /api/orders/:id/status` — Update order status (Admin required)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 👤 Author

Developed by **[Krishnam Namithaa](https://github.com/krishnamnamithaa)**.
