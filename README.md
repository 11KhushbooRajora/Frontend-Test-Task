# User Management CRUD App

A full-stack User Management application where you can create, view, update, and delete users.  
Built with a React frontend, Node.js/Express backend, and MongoDB database.

The application is designed with extensibility in mind, allowing new form fields to be added with minimal code changes using a configuration-driven form architecture.

---

## 🌐 Demo Link

**Live Demo:**  
https://frontend-test-task-gray.vercel.app/

---

## 🚀 Quick Start

### Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>


# 📦 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

# 🔧 Backend Setup
cd backend
npm install
npm run dev

Backend runs on:
http://localhost:3001

Make sure MongoDB is running locally or update your .env file with your MongoDB connection string.

## 🛠 Technologies Used
# Frontend
React JS
React Hooks (useState, useEffect)
Bootstrap (for UI styling)
Fetch API (for API calls)

# Backend
Node.js
Express.js
MongoDB
Mongoose

## ✨ Features
🧾 User Form

# Fields:
First Name
Last Name
Phone Number
Email Address

Each field includes:
Required validation
Input validation
Error messaging
Controlled components

## 🔄 CRUD Operations
# ➕ Create User
Add a new user using the form.

# 📋 Read Users
Display a list of all users from the API.

# ✏️ Update User
Edit an existing user's information.

# ❌ Delete User
Remove a user from the database.


## 🔌 API Reference
GET /users
Returns all users
# Sample Response:
``[
  {
    "_id": "123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "9876543210",
    "email": "john@example.com"
  }
]``

# POST /users
Create a new user

# Post /users/:id
Update existing user

# DELETE /users/:id
Delete a user

## Extensibility Design

The form is built using a configuration-driven approach.

Example (field configuration):

`javascript
const formFields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "phoneNumber", label: "Phone Number", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true }
];`


# ✅ How to Add a New Field

To add a new field like Date of Birth:
 1. Add it to the formFields array:
{ name: "dateOfBirth", label: "Date of Birth", type: "date", required: false }
 2. Add it to the backend Mongoose schema.
No major UI rewrite is required.

This makes the application scalable and maintainable.

## 📬 Contact
For any questions regarding this submission:
Email: rajorakhushboo443@gmail.com

