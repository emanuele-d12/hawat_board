# Todo board

A modern Kanban-style task manager built with Vue 3, TypeScript and Tailwind CSS.

This project was created as a learning and experimentation environment for:
- Vue 3 Composition API
- TypeScript
- Drag & Drop interfaces
- Component architecture
- Dockerized frontend workflows
- Responsive UI development

---

# Features

## Task Management
- Create tasks with keyboard support (`Enter` to submit)
- Multiple categories support
- Dynamic category creation
- Delete tasks
- Mark tasks as completed
- Quick edit tasks with double click
- Persistent local storage

---

## Drag & Drop
- Reorder tasks inside categories
- Move tasks between categories
- Reorder categories
- SortableJS integration

---

## Responsive UI
- Mobile-first responsive layout
- Equal-width category buttons
- Flexible task columns
- Tailwind CSS styling

---

## Export
- Export category tasks as `.txt` files

---

## Persistence
Currently the project uses:
- Browser `localStorage`

Planned:
- Shared JSON backend
- Multi-device synchronization
- Dynamic board URLs

---

# Tech Stack

## Frontend
- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- SortableJS

## DevOps / Deployment
- Docker
- Docker Compose
- Nginx

---

# Project Structure

```text
src/
 ├── components/
 │    ├── NewTask.vue
 │    ├── TaskColumn.vue
 │
 ├── types/
 │    ├── task.ts
 │
 ├── App.vue
```

---

# Development Setup

## Install dependencies

```bash
npm install
```

---

## Run locally

```bash
npm run dev
```

---

# Docker Development Environment

The project includes a dedicated Docker development environment with:
- hot reload
- mounted volumes
- isolated dependencies

## Start development container

```bash
docker compose up --build
```

Application will be available at:

```text
http://localhost:5173
```

---

# Production Build

## Build manually

```bash
npm run build
```

---

# Production Docker Environment

The production setup uses:
- multi-stage Docker build
- Nginx static serving
- optimized Vite build

## Start production container

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Application will be available at:

```text
http://localhost:8099
```

---

# Current Architecture

```text
Vue 3 App
   ↓
LocalStorage Persistence
```

---

# Planned Features

- Node.js backend
- Shared JSON storage
- Multi-device synchronization
- Dynamic boards (`/work`, `/shopping`, etc.)
- Vue Router integration
- Real-time collaboration
- Authentication
- Cloud synchronization

---

# Learning Goals

This project focuses on practicing:
- Vue Composition API
- Reactive state management
- Component communication
- Drag & Drop logic
- TypeScript typing
- Docker workflows
- Frontend architecture
- Deployment strategies

---

# License

PolyForm Noncommercial 1.0.0