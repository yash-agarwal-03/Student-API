# Student API

A simple RESTful API for managing student records, built with **Node.js**, **Express**, and **MongoDB** (via Mongoose).

---

## Features

- Add new students
- Retrieve all students
- Get, update, or delete a student by ID
- Input validation and error handling

---

## Project Structure

```
.
├── .env
├── .gitignore
├── package.json
├── server.js
├── models/
│   └── Student.js
└── routes/
    └── studentRoutes.js
```

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory. Example:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/studentApiServer
   ```

4. **Start the server:**
   ```sh
   npm start
   ```
   The server will run at [http://localhost:5000](http://localhost:5000) by default.

---

## API Endpoints

- **GET /**  
  Welcome message.

- **POST /students**  
  Add a new student.  
  **Body:**
  ```json
  {
    "name": "John Doe",
    "age": 20,
    "class": "10A",
    "rollNumber": "A123",
    "address": "123 Main St"
  }
  ```

- **GET /students**  
  Retrieve all students.

- **GET /students/:id**  
  Retrieve a student by MongoDB `_id`.

- **PUT /students/:id**  
  Update a student by `_id`.  
  **Body:** Any fields to update (same as POST).

- **DELETE /students/:id**  
  Delete a student by `_id`.

---

## Student Model

- `name`: String (2-50 chars, required)
- `age`: Number (1-120, required)
- `class`: String (1-20 chars, required)
- `rollNumber`: String (alphanumeric, unique, required)
- `address`: String (max 100 chars, optional)

---

## License

This project is licensed under the **ISC** license.
