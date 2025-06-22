# 📚 Kitler Library System

This is a simple Library Management System built with Express, TypeScript, and MongoDB (Mongoose).

It lets you manage books and handle borrowing logic with proper validation, filtering, and business rules.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose

## Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Irenity0/ass-3
cd ass-3
````

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

Add your MongoDB connection string.

```
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/library-db
```

4. **Start the server**

```bash
npm run dev
```

---

## API Endpoints

### Book Routes

#### `POST /api/books`

Create a new book.

#### `GET /api/books`

Get all books (supports filtering, sorting, limit).

#### `GET /api/books/:bookId`

Get a single book by ID.

#### `PUT /api/books/:bookId`

Update book info.

#### `DELETE /api/books/:bookId`

Delete a book.

---

### Borrow Routes

#### `POST /api/borrow`

Borrow a book (checks availability, deducts quantity).

#### `GET /api/borrow`

Borrow summary — shows total quantity borrowed per book (uses aggregation).

---

## Features

* Schema validation for books & borrow entries
* Availability check when borrowing
* Updates `available` status automatically
* Uses Mongoose static method and middleware
* Supports query filtering and sorting
