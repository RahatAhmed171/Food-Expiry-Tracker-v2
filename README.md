
# 🛒 Food Expiry & Stock Level Tracking System

## 📌 Overview

**Food Expiry & Stock Level Tracking System** is a backend-driven inventory and sales management application designed for small retail shop owners (*mudir dokan*).
The system helps store owners efficiently manage **product stock**, **batch-wise expiry dates**, and **sales**, while proactively notifying them about **near-expiry items** and **low stock levels**.

This project focuses on solving real-world problems faced by small shops that manage both **loose and packaged goods**, often without any digital tracking.



## 🎯 What This System Does

* Tracks products and their **current stock**
* Manages **batch-wise expiry dates** for the same product
* Automatically detects:

  * Near-expiry products
  * Low stock or stock-out scenarios
* Handles **two types of offline sales**:

  * **Quick Sale** (walk-in customers, no customer data stored)
  * **Detailed Sale** (regular customers with delivery & payment tracking)
* Calculates sales totals before finalizing a sale
* Designed to scale later into an **online store**



## 🧩 System Architecture

> 📷 **System Flow Diagram**
>
> *(Insert architecture / flow image here)*

The system follows a layered architecture:

* **Routes → Controllers → Services → Database**
* Business logic is kept out of routes
* Background jobs (expiry checks) run independently from APIs



## 🛠️ Tools & Libraries Used

**Backend**

* Node.js
* Express.js

**Database**

* MySQL
* Sequelize ORM

**Authentication & Security**

* JWT (jsonwebtoken)
* bcrypt

**Validation & Utilities**

* express-validator
* dotenv
* cookie-parser

**Templating (current UI)**

* EJS

**Dependencies**

```json
"bcrypt": "^5.1.1",
"cookie-parser": "^1.4.7",
"dotenv": "^16.4.7",
"ejs": "^3.1.10",
"express": "^4.21.2",
"express-validator": "^7.2.1",
"jsonwebtoken": "^9.0.2",
"mysql2": "^3.14.0",
"sequelize": "^6.37.6"
```


## 🔐 Authentication APIs

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/auth/register` | Register a new store owner |
| POST   | `/auth/login`    | Login and receive JWT      |
| GET    | `/auth/logout`   | Logout user                |



## 👤 User APIs

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| GET    | `/user/profile`                | Get logged-in user profile |
| POST   | `/user/profile`                | Update profile information |
| POST   | `/user/profile/changepassword` | Change account password    |



## 📦 Product APIs

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/products`     | Get paginated list of products |
| PATCH  | `/products/:id` | Update product details         |
| DELETE | `/products/:id` | Delete a product               |

> All product routes are **JWT protected** and scoped to the logged-in user.



## 🧾 Sales APIs

| Method | Endpoint          | Description                       |
| ------ | ----------------- | --------------------------------- |
| POST   | `/sale/calculate` | Calculate total price before sale |
| POST   | `/sale`           | Finalize sale & update stock      |

**Sales Logic**

* Validates stock availability before sale
* Deducts quantity using **FIFO (earliest expiry first)**
* Updates product stock & batch quantities atomically
* Triggers in-app notifications when stock drops below threshold



## ⏰ Background Processing (No Public API)

* Scheduled jobs run daily to:

  * Detect near-expiry batches
  * Notify store owners via in-app alerts
* These are **internal services**, not exposed as REST APIs
  *(industry-standard practice)*



## 🚧 Project Status

🟡 **Ongoing Project**

Currently implemented:

* Core product & batch management
* Secure authentication
* Sales flow (Quick & Detailed)
* Stock & expiry logic
* REST-style APIs

Planned features:

* In-app notification system (bell icon)
* Online store integration
* API documentation (Swagger)
* Deployment & CI/CD


## 💡 Why This Project Matters

This project demonstrates:

* Real-world backend system design
* Practical REST API structuring
* Transaction-safe inventory updates
* Understanding of business workflows, not just CRUD

It is built with **scalability and industry practices** in mind.


