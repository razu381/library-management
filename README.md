# 📚 Library Management API

A Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This API allows you to manage books and borrowing operations with robust validation, business logic, and aggregation features.

---

## 🚀 Features

- **Book Management:** Create, update, delete, and retrieve books.
- **Borrow Management:** Borrow books, track due dates, and summarize borrow records.
- **Validation:** Strict schema validation for all models.
- **Business Logic:** Controls book availability and borrowing rules.
- **Aggregation:** Summarizes borrowed books using MongoDB aggregation pipeline.
- **Mongoose Methods & Middleware:** Uses static methods and middleware for business logic.
- **Filtering & Sorting:** Filter books by genre, sort, and limit results.
- **Consistent Error Handling:** All errors follow a standard response format.

---

## 🎥 Video Explanation

<a href="https://www.loom.com/share/0b4b119a9dc04f42b46c2a386c853f98" target="_blank">
  <img src="https://i.ibb.co/MkP9Q95R/library-management.jpg" alt="Watch the video" width="400"/>
</a>

A short video explaining the key features and logic is available at:
https://www.loom.com/share/0b4b119a9dc04f42b46c2a386c853f98

---

## 🛠️ Setup Instructions

1. **Clone the Repository**

   ```
   git clone https://github.com/razu381/library-management
   cd NXTA-03
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Configure Environment**

   - Create a `.env` file in the root directory.
   - Add your MongoDB URI:
     ```
     MONGODB_URI=mongodb://localhost:27017/librarydb
     PORT=5000
     ```

4. **Run the Server**
   ```
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

---

## 📖 API Endpoints

### 1. Create Book

- **POST** `/api/books`
- **Body:**
  ```json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": {
      /* book object */
    }
  }
  ```

---

### 2. Get All Books

- **GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
      /* array of books */
    ]
  }
  ```

---

### 3. Get Book by ID

- **GET** `/api/books/:bookId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
      /* book object */
    }
  }
  ```

---

### 4. Update Book

- **PUT** `/api/books/:bookId`
- **Body:**
  ```json
  {
    "copies": 50
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": {
      /* updated book object */
    }
  }
  ```

---

### 5. Delete Book

- **DELETE** `/api/books/:bookId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": null
  }
  ```

---

### 6. Borrow a Book

- **POST** `/api/borrow`
- **Body:**
  ```json
  {
    "book": "<bookId>",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
      /* borrow object */
    }
  }
  ```

---

### 7. Borrowed Books Summary

- **GET** `/api/borrow`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      }
    ]
  }
  ```

---

## ❗ Error Response Format

All errors follow this format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    /* error details */
  }
}
```

---

## 📝 Project Structure

```
NXTA-03/
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── app/
│       ├── controllers/
│       │   ├── book.controller.ts
│       │   └── borrow.controller.ts
│       ├── interfaces/
│       │   ├── book interface.ts
│       │   └── borrow interface.ts
│       ├── models/
│       │   ├── book.model.ts
│       │   └── borrow.model.ts
│       └── utils/
│           └── sendCustomError.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎥 Video Explanation

A short video explaining the key features and logic is available at: [Demo Video Link](https://youtu.be/demo)

---

## 🌐 Live Deployment

Live API: [Demo Deployment Link](https://demo-library-api.vercel.app)

---
