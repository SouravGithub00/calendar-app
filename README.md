
# Calendar App

Welcome to the Calendar App repository! This project is a full-stack calendar application where administrators can create slots, and students can book slots on different days.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Setting up MongoDB

Ensure MongoDB is installed and running locally. The MongoDB URI is specified in `backend/index.js` (line 10). Update this URI if you encounter MongoDB connection issues.

### Running the Application

1. **Backend (Node.js Express API):**

   ```bash
   cd backend
   npm run dev
   ```

   This command starts the backend server using Nodemon, which automatically restarts the server when changes are made.

2. **Frontend (React App):**

   ```bash
   cd frontend
   npm run dev
   ```

   This command starts the React development server.

### Accessing the Application

- **Frontend:** Open your browser and go to `http://localhost:5173` to view the React application.
- **Backend:** The backend server will be running on `http://localhost:5000`.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)

## Contributing

Contributions are welcome! Fork the repository and submit a pull request.
