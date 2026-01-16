# Quiz Mania

A full-stack quiz application where **teachers can create and manage quizzes** and **students can attempt quizzes and track their performance**.  
The system supports **role-based authentication**, **analytics**, and **scalable data handling**.

---

## 🚀 Live Demo
👉 [Live URL here]

---

## 🔑 Demo Credentials

### Teacher
- Email: teacher@test.com  
- Password: 123456  

### Student
- Email: student@test.com  
- Password: 123456  

---

## ✨ Features

### Authentication & Roles
- Role-based signup and login (Teacher / Student)
- Protected routes based on user role
- Secure session handling

### Teacher Features
- Create quiz sets
- Add and manage questions
- Publish / unpublish quizzes for student visibility
- Paginated quiz listing for better performance

### Student Features
- Attempt published quizzes
- View last attempted quiz
- Quiz performance summary:
  - Total accuracy
  - Correct answers
  - Wrong answers
- View all-time performance with line chart
- See history of all attempted quizzes
- Paginated quiz listing

### Analytics
- Performance calculation per quiz
- Aggregated all-time performance
- Visual representation using charts

---

## 🧠 Tech Stack

- **Frontend:** Next.js, React
- **Backend:** Next.js API Routes
- **Database:** MongoDB, Mongoose
- **UI:** Tailwind CSS, shadcn/ui
- **Forms:** React Hook Form
- **Rendering:** Server-Side Rendering (SSR)
- **State Management:** React state & context
- **Charts:** Chart library (Line Chart)

---

## 🏗️ System Architecture

- **User Model:** Handles role-based access (Teacher / Student)
- **Quiz Model:** Stores quiz sets and metadata
- **Question Model:** Stores quiz questions
- **Attempt Model:** Tracks student attempts and performance
- **Role Guards:** Ensure proper access to routes and actions
- **Pagination:** Used to handle large quiz datasets efficiently

---

## 📈 Why Pagination?
Pagination is implemented to:
- Improve performance
- Reduce server load
- Handle large data sets smoothly for both teachers and students

---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
npm install
