# Vanilla JS Todo App

A simple Todo List application with a JavaScript frontend and JSON Server backend.

## Setup & Running

### 1. Install dependencies
```bash
npm install
```

### 2. Start the backend
```bash
npm run start-backend
```
This starts the JSON Server at http://localhost:3000

### 3. Open the frontend
Open `index.html` in your browser (double-click it, or use a local server).

## Features
- View all todos
- Add new todos
- Toggle todos complete/incomplete (click the task text)
- Delete todos
- Data persists in `db.json`

## Project Structure
```
vanilla-js-todo/
├── index.html     # App structure
├── style.css      # Styling
├── script.js      # Frontend logic (fetch, add, toggle, delete)
├── db.json        # Database (auto-updated by JSON Server)
└── package.json   # Scripts & dependencies
```
