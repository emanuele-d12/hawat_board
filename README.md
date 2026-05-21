# hawat_board

A lightweight self-hosted Kanban board built with Vue 3, TypeScript and Vite.

Designed to be simple, fast and extensible, with support for drag & drop task management, dynamic categories and Docker-based deployment.

---

## Features

- ✅ Dynamic task categories
- ✅ Drag & drop task management
- ✅ Cross-column task movement
- ✅ Persistent local storage
- ✅ Reorderable columns
- ✅ Plaintext export
- ✅ Responsive UI
- ✅ Docker support
- ✅ Nginx production serving
- 🚧 Backend synchronization (WIP)
- 🚧 Shared boards (planned)
- 🚧 Real-time collaboration (planned)

---

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- SortableJS
- Docker
- Nginx
- Express (backend WIP)

---


## Architecture

```txt
Frontend (Vue 3 + TypeScript)
        ↓
Reactive State Management
        ↓
LocalStorage Persistence
        ↓
Future Express API Backend
```

---

## Project Structure

```txt
.
├── src
│   ├── components
│   │   ├── ListTasks.vue
│   │   ├── NewTask.vue
│   │   └── TaskColumn.vue
│   ├── router
│   ├── types
│   ├── assets
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── public
├── local
├── Dockerfile
├── Dockerfile.dev
├── nginx.conf
├── package.json
└── vite.config.ts
```

---

## Core Concepts

### Dynamic Categories

Categories are fully dynamic and can be:

- created at runtime
- reordered
- removed
- used as drag & drop containers

Unlike traditional todo apps, columns are not hardcoded.

---

### Drag & Drop System

Tasks can be:

- reordered inside the same column
- moved across categories
- persisted automatically

Powered by SortableJS.

---

### Persistent Ordering

Each task contains an internal order index:

```ts
task.order
```

This guarantees stable rendering and persistent ordering across reloads.

---

### Export System

The board supports plaintext export for:

- single categories
- entire boards

Useful for notes, backups or external sharing.

---

## Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Application will be available at:

```txt
http://localhost:5173
```

---

## Production Build

```bash
npm run build
```

---

## Docker

### Build image

```bash
docker build -t hawat_board .
```

### Run container

```bash
docker run -p 8080:80 hawat_board
```

Application will be available at:

```txt
http://localhost:8080
```

---

## Docker Compose

### Development

```bash
docker compose up
```

### Production

```bash
docker compose -f docker-compose.prod.yml up -d
```

---

## Backend (Work In Progress)

A backend service based on Express is currently being prepared for:

- board persistence
- shared boards
- synchronization
- multi-user support

Current architecture already anticipates backend integration.

---

## Roadmap

### Short Term

- [ ] Backend persistence
- [ ] Better mobile UX
- [ ] Dark mode
- [ ] Improved export formatting

### Mid Term

- [ ] Multi-board support
- [ ] URL-based boards
- [ ] Shared workspaces
- [ ] Authentication

### Long Term

- [ ] Real-time collaboration
- [ ] WebSocket sync
- [ ] User permissions
- [ ] Offline-first support

---

## License

MIT

```