# Modern Task Manager

A clean and modern task management application built with Next.js and TypeScript. Features a responsive design, task filtering, and input validation.

## Features

-  Modern, clean UI with smooth transitions
-  Fully responsive design
-  Create, complete, and delete tasks
-  Filter tasks by status (All/Active/Completed)
-  Real-time input validation
-  Keyboard support (Enter to add tasks)

## Input Validation

- Task title cannot be empty
- Task title must be at least 3 characters
- Duplicate tasks are not allowed

## Getting Started

1. Clone the repository:

git clone  
cd frontend-task-manager


2. Install dependencies:

npm install
# or
yarn install
# or
pnpm install


3. Run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev


4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Usage

1. **Adding a Task**
   - Type your task in the input field
   - Press Enter or click "Add Task"
   - Note: Task title must be at least 3 characters

2. **Completing a Task**
   - Click the checkbox next to the task
   - The task will be marked as completed with a strikethrough

3. **Deleting a Task**
   - Click the delete (trash) icon next to the task

4. **Filtering Tasks**
   - Click "All" to view all tasks
   - Click "Active" to view uncompleted tasks
   - Click "Completed" to view completed tasks

