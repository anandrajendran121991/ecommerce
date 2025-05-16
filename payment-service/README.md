# Payment Service

The Payment Service Microservice is designed to handle all payment-related functionalities for the application, including integrating with payment platforms such as Stripe to process payments. This microservice provides RESTful APIs that other services (Order) can consume to initiate payment transactions.

# 🛒 Full Stack E-Commerce Platform

This is a full-stack e-commerce platform that allows users to:

- Browse products from inventory
- Add products to a cart
- Checkout with Stripe payments
- Authenticate using Azure AD B2C

---

## 🧱 Tech Stack

### Backend

- Node.js + Express
- TypeScript
- MySQL (via TypeORM)
- Stripe Payments Integration
- Azure AD B2C Authentication (OAuth2)
- Docker

### Frontend

- React
- Axios
- Material UI
- OAuth 2.0

---

## 📁 Project Structure

```bash
/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── entities/
│   │   └── index.ts
│   ├── Dockerfile
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml
└── README.md

```
