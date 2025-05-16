# 🛒 Full-Stack Product & Payment App

A full-stack, Dockerized application featuring three services that together support product browsing, checkout, and secure Stripe-based payments.

---

## 🔧 Services Overview

1. **🧾 Payment Service**
   Handles all payment processing logic using Stripe, including:

   - Creating Payment Intents
   - Handling webhooks for payment confirmation
   - Updating order status in the database after payment

2. **🛍️ UI Service (Frontend)**
   A React + TypeScript + Vite application using Material UI for displaying products, managing the cart, and completing checkout.

3. **🗄️ MySQL Database**
   Stores product listings, order records, and transaction metadata.

---

## 📦 Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | React, TypeScript, Vite, Material UI |
| Backend  | Node.js, Express, Stripe SDK         |
| Database | MySQL                                |
| DevOps   | Docker, Docker Compose, Kubernetes   |

---

## 🚀 Features

- Browse products from a MySQL-backed inventory
- Add items to a cart
- Checkout securely using **Stripe**
- Real-time order updates via Stripe **webhooks**
- Developer-friendly: hot reloading + TypeScript

---

## 🧾 Payment Service – Stripe Integration

The Payment Service is the backend API responsible for securely managing payment logic.

### ✅ Key Endpoints

| Method | Route                    | Description                                           |
| ------ | ------------------------ | ----------------------------------------------------- |
| POST   | `/create-payment-intent` | Creates a Stripe PaymentIntent                        |
| POST   | `/webhook`               | Handles Stripe events like `payment_intent.succeeded` |
| GET    | `/orders/:userId`        | Returns orders for a specific user                    |
| POST   | `/orders`                | Creates a new order (optional pre-payment)            |

---

### 🔔 Webhook Flow

1. Stripe triggers `payment_intent.succeeded`.
2. The service:

   - Verifies the Stripe signature.
   - Extracts metadata (like `orderId`).
   - Updates the related order in MySQL with:

     - `status: paid`
     - `paymentId`
     - `paidAt` timestamp.

```ts
// Webhook snippet
if (event.type === "payment_intent.succeeded") {
  const intent = event.data.object as Stripe.PaymentIntent;
  const orderId = intent.metadata.orderId;

  await updateOrderStatus(orderId, {
    status: "paid",
    paymentId: intent.id,
    paidAt: new Date(),
  });
}
```

---

### 🗃️ Example `orders` Table

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  payment_id VARCHAR(255),
  paid_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🔐 Required Environment Variables

Configure these in a `.env` file or your Docker Compose environment:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🧩 Project Structure

```bash
├── payment-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── entities/
│   │   └── index.ts
│   ├── Dockerfile
│   └── tsconfig.json
├── ui-service/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- Stripe test API keys

### Run the App

```bash
docker-compose up --build
```

Then visit:

- 🛍️ UI: [http://localhost:5173](http://localhost:5173)
- 🧾 API: [http://localhost:3000](http://localhost:3000)

---

Let me know if you'd like a Markdown file output or want Kubernetes deployment instructions added next.
