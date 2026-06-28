# IEEE RVCE Tech Fest Registration System (Backend)

A secure and scalable REST API built for the IEEE RVCE Tech Fest Registration System.

The backend handles the complete event lifecycle:
- Student Authentication
- Event Registration
- Payment Confirmation (Simulated)
- QR Ticket Generation
- Volunteer Check-in

The project follows Clean Architecture principles with proper separation of concerns for maintainability and scalability.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Zod Validation
- QRCode

---

# Features

## Authentication

- Student Registration
- Volunteer Registration
- Login using JWT
- Password Hashing with bcrypt

## Student

- Register for Event
- Prevent Duplicate Registrations
- Simulated Payment Confirmation
- QR Ticket Generation
- View Ticket

## Volunteer

- View All Registrations
- QR Based Student Check-in
- Prevent Duplicate Check-ins

## Security

- JWT Authentication
- Role Based Authorization
- Password Hashing
- Request Validation using Zod
- Centralized Error Handling

---

# Project Structure

```
src/
│
├── config/
├── controllers/
├── middleware/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
├── validations/
│
├── app.ts
└── server.ts
```

### Folder Responsibilities

| Folder | Responsibility |
|---------|---------------|
| controllers | Handle HTTP requests/responses |
| services | Business Logic |
| repositories | Database Operations |
| middleware | Authentication, Authorization, Validation |
| validations | Zod Schemas |
| utils | Helper Functions |
| routes | API Endpoints |
| config | Environment Configuration |

---

# Installation

Clone the repository

```bash
git clone <repository-url>
cd ieee
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=3000

DATABASE_URL="postgresql://postgres:password@localhost:5432/ieee_rvce?schema=public&sslmode=disable"

JWT_SECRET="your-secret-key"

JWT_EXPIRES_IN="1d"
```

---

# Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Push Schema

```bash
npx prisma db push
```

---

# Run Project

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Run Production

```bash
npm start
```

---

# Testing Accounts

### How to create a volunteer account for testing

To create a volunteer account to test the gate check-in functionality, send a `POST` request to `/auth/register` with the `role` field set to `VOLUNTEER`:

```json
{
  "name": "Test Volunteer",
  "email": "volunteer@test.com",
  "password": "password123",
  "role": "VOLUNTEER"
}
```
*Note: A pre-configured request for this is already included in the Postman Collection.*

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/register |
| POST | /auth/login |

---

## Student

| Method | Endpoint |
|---------|----------|
| POST | /registration |
| POST | /payment/confirm |
| GET | /ticket |

---

## Volunteer

| Method | Endpoint |
|---------|----------|
| GET | /volunteer/registrations |
| POST | /volunteer/checkin |

---

# Design Decisions

### Simulated Payment

Payment gateway integration is outside the scope of this assignment.

Payment confirmation is simulated using:

```
POST /payment/confirm
```

The endpoint is **idempotent**, meaning repeated requests do not create duplicate payments.

---

### QR Code

After payment confirmation,

- a ticket is created
- a QR code is generated

The QR stores the student's **registrationId**.

Volunteers use this value to check students in.

---

# Validation

Incoming requests are validated using **Zod**.

Examples:

- Invalid Email
- Missing Fields
- Invalid UUID
- Weak Password

All validation errors return meaningful responses.

---

# Authentication & Authorization

JWT Authentication protects secured endpoints.

Role Based Access Control is implemented.

Student:
- Register
- Pay
- View Ticket

Volunteer:
- View Registrations
- Check-in Students

---

# Error Handling

Centralized global error handler.

Handles

- Validation Errors
- Authentication Errors
- Authorization Errors
- Database Errors
- Custom Application Errors

---

# Testing

The project has been manually tested using Postman.

Scenarios tested include:

- User Registration
- Duplicate Registration
- Login
- Invalid Credentials
- Event Registration
- Duplicate Event Registration
- Payment Confirmation
- Ticket Retrieval
- Volunteer Login
- Registration Listing
- Student Check-in
- Duplicate Check-in
- Unauthorized Requests
- Role Based Access Control

---

# Documentation

Additional documents are available inside the `docs` folder.

- IEEE_RVCE_Postman_Collection.json
- SCALE.md

---

# Author

**Satyendra Nayak K**

IEEE RVCE Backend Recruitment Task