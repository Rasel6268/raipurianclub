# Raipur Club (Raipurian Club) 🏛️🤝🇧🇩

[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![Community First](https://img.shields.io/badge/Community-First-blue.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Raipur Club** is a modern community platform designed to connect members, manage memberships, organize events, and support community engagement. The platform provides a digital hub for membership applications, events, organizational information, and community activities.

🔗 **Live Website:** https://www.raipurclub.com/

---

## 📋 Table of Contents

* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Development Server](#development-server)
* [Available Scripts](#-available-scripts)
* [Membership Tiers](#-membership-tiers)
* [License](#-license)
* [Contact](#-contact)

---

## ✨ Features

* 👥 **Membership Management** — Support multiple membership categories and membership applications.
* 📋 **Online Membership Application** — Allow users to submit membership applications digitally.
* 📅 **Event Management** — Showcase upcoming events and community programs.
* 🎟️ **Event Registration** — Allow members and visitors to register for events.
* 💳 **Online Payments** — Support digital payment integration for membership fees and contributions.
* 🎯 **Mission & Vision** — Present the organization's mission, vision, goals, and community activities.
* 📊 **Community Information** — Display organizational statistics and community impact.
* 🌐 **Bilingual Support** — Designed to support both English and Bengali content.
* 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
* ⚡ **High Performance** — Built with modern web technologies for fast page loading and smooth navigation.

---

## 🛠️ Tech Stack

### Frontend

* **Framework:** Next.js
* **Library:** React.js
* **Language:** JavaScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React / React Icons

### Backend

* **Runtime:** Node.js
* **Framework:** Express.js / Next.js API
* **Authentication:** JWT / NextAuth.js

### Database

* **MongoDB**
* **Mongoose**
* **MongoDB Atlas**

### Tools

* Git
* GitHub
* VS Code
* npm
* Postman

---

## 📁 Project Structure

```text
raipur-club/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── events/
│   │   ├── membership/
│   │   ├── contact/
│   │   ├── login/
│   │   └── api/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── EventCard/
│   │   ├── MembershipCard/
│   │   └── Modal/
│   │
│   ├── lib/
│   │   ├── db.js
│   │   ├── auth.js
│   │   └── utils.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Member.js
│   │   ├── Event.js
│   │   └── Payment.js
│   │
│   └── styles/
│       └── globals.css
│
├── .env.example
├── .gitignore
├── package.json
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

Follow the instructions below to run the project locally.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) v18 or higher
* [npm](https://www.npmjs.com/) or Yarn
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/) or MongoDB Atlas
* VS Code or another code editor

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/raipur-club.git
cd raipur-club
```

### 2. Install Dependencies

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory.

```env
# Application
PORT=3000
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/raipurclub

# Authentication
NEXTAUTH_SECRET=your_super_secret_nextauth_key
JWT_SECRET=your_jwt_secret_key

# SSLCommerz
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password

# bKash
BKASH_APP_KEY=your_bkash_app_key
BKASH_APP_SECRET=your_bkash_app_secret
BKASH_USERNAME=your_bkash_username
BKASH_PASSWORD=your_bkash_password
```

> ⚠️ **Important:** Never commit `.env.local` or any file containing secrets to GitHub.

---

## 💻 Development Server

Start the development server:

```bash
npm run dev
```

Or:

```bash
yarn dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Creates the production build  |
| `npm run start` | Starts the production server  |
| `npm run lint`  | Runs ESLint                   |

---

## 💳 Membership Tiers

| Membership           | Registration Fee | Voting Rights | Service Priority | Food Discount |
| -------------------- | ---------------: | :-----------: | :--------------: | ------------: |
| **Patron Member**    |       ৳10,00,000 |      Yes      |    Priority 1    |           25% |
| **Donor Member**     |        ৳6,00,000 |      Yes      |    Priority 1    |           20% |
| **Founder Member**   |        ৳2,00,000 |      Yes      |    Priority 1    |           20% |
| **Life Member**      |        ৳4,00,000 |      Yes      |    Priority 2    |           20% |
| **General Member**   |        ৳2,00,000 |       No      |    Priority 3    |           20% |
| **Associate Member** |          ৳50,000 |       No      |    Priority 4    |           N/A |
| **Honorary Member**  |           No Fee |       No      |    Priority 1    |           10% |

---

## 🔌 Core Modules

### 👥 Membership

* Membership registration
* Membership application
* Member profile
* Membership category management
* Membership status management

### 📅 Events

* Upcoming events
* Event details
* Event registration
* Attendee management
* Event status

### 💰 Payments

* Membership fee payments
* Event payments
* Payment status tracking
* Transaction records
* Payment verification

### 🔐 Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Role-based authorization

---

## 🔒 Security

The platform follows standard web security practices:

* JWT-based authentication
* Password hashing
* Protected API routes
* Role-based access control
* Environment-based secret management
* Input validation
* Secure payment verification
* CORS configuration

---

## 🚀 Deployment

### Frontend

Recommended platforms:

* Vercel
* Netlify
* AWS
* DigitalOcean

### Backend

Recommended platforms:

* DigitalOcean
* AWS
* Render
* Railway
* VPS

### Database

* MongoDB Atlas
* Self-hosted MongoDB

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/AmazingFeature
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m "Add AmazingFeature"
```

5. Push your branch:

```bash
git push origin feature/AmazingFeature
```

6. Open a Pull Request.

---

## 🐛 Issues

If you discover a bug or have a feature request, please create an issue and include:

* A clear description
* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots, if applicable

---

## 📄 License

This project is distributed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for more information.

---

## 📞 Contact

**Raipur Club (Raipurian Club)**

🌐 **Official Website:** https://www.raipurclub.com/

📧 **Email:** [contact@raipurianclub.com](mailto:contact@raipurianclub.com)

📍 **Address:** Raipur, Lakshmipur, Chattogram, Bangladesh

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ for the Raipur community 🇧🇩**
