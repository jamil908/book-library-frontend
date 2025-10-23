# 📚 Library Management Frontend

A modern frontend web application for managing books and borrow records in a library system.  
Built using **React (TypeScript)**, **Vite / Next.js**, and **Tailwind CSS**.

---

## 🚀 Features

- 📖 **Book Management**
  - View all books with filters, sorting, and pagination
  - Add, edit, and delete books (CRUD)
  - Dynamic “Available / Unavailable” status display

- 📦 **Borrow Management**
  - Borrow books with quantity and due date
  - Real-time book availability updates
  - Summary of borrowed books (with total quantity)

- 🔍 **Search & Filter**
  - Search by book title or author
  - Filter by genre
  - Sort by creation date or copies count

- 🧩 **UI Highlights**
  - Responsive design (mobile-first)
  - Built with ShadCN UI / Tailwind components
  - Reusable form, modal, and table components

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Framework** | React (TypeScript) |
| **Styling** | Tailwind CSS, ShadCN UI |
| **State Management** | React Hooks /   / Redux Toolkit |
| **API Communication** | Axios / Fetch API |
| **Routing** | React Router DOM |
| **Build Tool** | Vite |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone http://github.com/jamil908/book-library-frontend
cd library-frontend
```
## 2️⃣ Install dependencies
npm install

## 3️⃣ Create environment file

Create a .env file in the root folder:

VITE_API_URL=http://localhost:5000/api


Change the URL if your backend runs elsewhere (e.g., production).

## 4️⃣ Run development server
npm run dev


The app will be live at:
👉 http://localhost:5173

## 🧭 Project Structure
src/
 ├── layOuts/
 │   ├── layouts.tsx
 ├── pages/
 │   ├── AddBookPage.tsx
 │   ├── BookDetailsPage.tsx
 │   ├── BookPage.tsx
 │   ├── BorrowBookPage.tsx
 │   ├── BorrowBookSummery.tsx
 │   ├── EditBookPage.tsx
 │   ├── LandingPage.tsx
 │   ├── Navbar.tsx
 ├── redux/
  │   └── store.ts
 ├── services/
 │   ├── bookApi.ts
 ├── types/
 │   ├── api.types.ts
 │   └── book.types.ts
 │   └── borrow.types.ts
 ├── App.tsx
 ├── main.tsx
 └── index.css


## 🧑‍💻 Author

### Md Jamil Hossain Rafi
📍 Chittagong, Bangladesh
💻 GitHub : https://github.com/jamil908
 | Portfolio