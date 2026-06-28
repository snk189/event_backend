# 🎉 IEEE RVCE Tech Fest Registration System (Backend)

Welcome to the backend repository for the **IEEE RVCE Tech Fest Registration System**! 

This project was built to deliver a production-ready, scalable, and secure API to handle student registrations, payment confirmations, and volunteer check-ins during the fest. It is crafted with a strong focus on clean architecture, ensuring the code is as easy to read and maintain as it is robust.

---

## 🛠️ Built With...
- **Node.js & Express.js**: Our core runtime and web framework.
- **TypeScript**: Because we all love type safety and fewer runtime bugs!
- **Prisma & PostgreSQL**: For a reliable, strongly-typed database layer.
- **Zod**: To rigorously validate every piece of data coming into our API.
- **JWT & bcrypt**: For secure authentication and password hashing.

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running on your machine.

### 1. Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or via a cloud provider)

### 2. Installation
Clone the repository, navigate into the folder, and install the dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the project (if it isn't already there) and add your database configuration:
```env
PORT=3000
# Replace with your actual Postgres credentials
DATABASE_URL="postgresql://postgres:password@localhost:5432/ieee_rvce?schema=public&sslmode=disable"
JWT_SECRET="super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="1d"
```

### 4. Database Setup
Let's get your database ready! Prisma will automatically map the schema and create the tables for you. Run:
```bash
npx prisma generate
npx prisma db push
```

### 5. Fire it up!
You're all set. Start the development server with hot-reloading:
```bash
npm run dev
```
*(Your server should now be happily humming on port 3000!)*

---

## 📂 How It's Organized (Clean Architecture)

We believe in keeping things tidy. Here is how the project is structured:

- **`src/config/`**: Where we handle environment variables and global configurations.
- **`src/controllers/`**: The traffic cops. They receive HTTP requests, call the right services, and send back the responses. No heavy lifting here!
- **`src/services/`**: The brain of the app. All business logic (like idempotency checks and QR generation) lives here.
- **`src/repositories/`**: The database bouncers. Only these files are allowed to talk directly to Prisma.
- **`src/routes/`**: Defines our API endpoints and wires up the controllers and middlewares.
- **`src/middleware/`**: Handles things that need to happen *before* the controller steps in (like JWT verification, role checking, and global error handling).
- **`src/validations/`**: Our Zod schemas that ensure incoming data is exactly what we expect.
- **`src/utils/`**: Handy little helper functions (like hashing passwords or generating QR codes).

---

## 💡 A Few Assumptions Made During Development

To keep the project focused, a few design decisions were made:
- **Payments**: We aren't hooking into a real payment gateway (like Stripe or Razorpay) for this challenge. Instead, a logged-in student can hit the `/payment/confirm` endpoint to simulate a successful transaction. Hitting this multiple times won't break anything (it's idempotent!).
- **QR Codes**: Once a payment is confirmed, a QR code is generated. This QR code simply encodes the student's unique `registrationId`. When a volunteer scans the QR, they submit that ID back to the backend to check the student in.

---

## 📖 API Documentation (Postman)

Want to test the endpoints? I've got you covered. 

Included in the root directory is a file named **`IEEE_RVCE_Postman_Collection.json`**. 
Simply import this file into your Postman app. It has all the endpoints pre-configured, complete with example request bodies. It even automatically grabs your JWT token when you log in and uses it for your subsequent requests!

---

*Built with ❤️ for the IEEE RVCE Backend Hiring Challenge.*
