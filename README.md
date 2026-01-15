
# Job Listing Web Application

This is a full-stack **Job Listing Web Application** developed as part of the  
**Mployee.me (Padhakku Peek a Book Private Limited) technical assignment**.

The application allows users to browse job listings, search jobs by location, and view detailed job information dynamically in a split-screen layout similar to the reference UI shared in the task document.

---

## 🎯 Objective

To build a job listing web application where:
- Jobs are displayed on the left-hand side
- Clicking a job shows its details on the right-hand side
- Users can search jobs based on location
- Job data is stored in MongoDB and filtered via backend APIs

---

## 🚀 Features

### Frontend
- Left panel displaying a list of jobs
- Right panel displaying selected job details dynamically
- Location-based search with a search button
- Loading spinner while data is being fetched
- Responsive and clean UI using Tailwind CSS
- Graceful handling of missing fields (e.g., job description)

### Backend
- Job data stored in MongoDB
- REST APIs built with Express.js
- Backend-side filtering based on location (no frontend filtering)
- MongoDB schema created based on the provided JSON dataset

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

```

mployee-job-app/
│
├── frontend/
│   ├── app/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   └── package.json
│
└── README.md

````

---

## ▶️ Steps to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repository-url>
cd mployee-job-app
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Import the job data into MongoDB:

```bash
node scripts/importJobs.js
```

Start the backend server:

```bash
npm run dev
```

Backend will be running at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be running at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### Fetch all jobs

```
GET /api/jobs
```

### Fetch jobs filtered by location

```
GET /api/jobs?location=Delhi
```

> All filtering is handled on the backend as recommended in the task instructions.

---

## 🌐 Deployed URLs

* **Frontend (Vercel):** To be added
* **Backend (Railway.app):** To be added

---

## ⚠️ Assumptions & Notes

* The provided dataset does not consistently include a job description field.
* When a description is missing, a fallback message is shown in the UI.
* Some optional fields (such as posted date) are displayed only when available.
* No mock or fake data has been added.
* Backend-side filtering is used to improve performance and scalability.

---

## 🧩 Challenges Faced

* Handling inconsistent fields in the dataset
* Preventing frontend crashes during API or backend failures
* Implementing backend-side filtering instead of frontend filtering
* Creating a clean UI similar to the reference while keeping it simple

---

## ✅ Task Completion Summary

All requirements from the task document have been successfully implemented:

* Job listing view
* Job detail view
* Location-based search
* MongoDB integration
* Backend filtering
* Clean project structure

---

**Thank you for the opportunity to work on this assignment.**
