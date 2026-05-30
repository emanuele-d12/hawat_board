# hawat_board

A lightweight self-hosted Kanban board built with Vue 3, TypeScript and Vite.

Designed to be simple, fast and extensible, with support for drag & drop task management, dynamic categories and self-hosted deployment.

---

## Features

- ✅ Dynamic task categories
- ✅ Drag & drop task management
- ✅ Cross-column task movement
- ✅ Reorderable columns
- ✅ Persistent task ordering
- ✅ Plaintext export
- ✅ Responsive UI
- ✅ Docker support
- ✅ Nginx production serving
- ✅ UUID-based boards
- ✅ Board persistence via backend
- ✅ Automatic debounced saving
- ✅ URL-based board sharing
- 🚧 Authentication
- 🚧 Real-time collaboration

---

## Tech Stack

### Frontend

- Vue 3
- TypeScript
- Vite
- Vue Router
- Tailwind CSS
- SortableJS
- Lodash Debounce

### Backend

- Node.js
- Express
- TypeScript

### Infrastructure

- Docker
- Docker Compose
- Nginx

---

## Architecture

```txt
Browser
    ↓
Vue 3 Frontend
    ↓
Reactive State
    ↓
Auto Save (Debounced)
    ↓
Express API
    ↓
Board Storage
```

---

## Project Structure

```txt
.
├── backend
│   ├── data
│   ├── src
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── router
│   │   ├── services
│   │   ├── types
│   │   └── App.vue
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

## Board Lifecycle

### Create Board

Accessing:

```txt
/
```

creates a new board through the backend.

A UUID is generated and the user is redirected to:

```txt
/board/<uuid>
```

Example:

```txt
/board/e080cdc5-5cd6-4617-aa43-d0f633a47074
```

---

### Load Board

When a board URL is opened:

```txt
/board/:boardId
```

the frontend retrieves:

- tasks
- categories

from the backend API.

Hydration safeguards prevent accidental save operations while loading board state.

---

### Save Board

Board changes are automatically saved.

Triggered by:

- task creation
- task deletion
- task editing
- task movement
- task reorder
- category creation
- category deletion
- category reorder

Saving is debounced to reduce API traffic and unnecessary writes.

---

## Dynamic Categories

Categories are fully dynamic and can be:

- created at runtime
- reordered
- removed
- used as drag & drop containers

Columns are not hardcoded.

---

## Drag & Drop System

Tasks can be:

- reordered within the same category
- moved across categories
- persisted automatically

Powered by SortableJS.

---

## Persistent Ordering

Each task contains an internal order value:

```ts
task.order
```

This guarantees stable rendering and deterministic ordering across reloads and backend synchronization.

---

## Export System

Boards can be exported as plaintext.

Example:

```txt
todo

Fix API
Deploy Raspberry

doing

Write documentation

done

Initial setup
```

Useful for:

- backups
- documentation
- external sharing
- migration

---

## Development

### Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### Start development servers

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev
```

---

## Production Build

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm run build
```

---

## Docker

### Development

```bash
docker compose up
```

### Production

```bash
docker compose -f docker-compose.prod.yml up -d
```


---

## Roadmap

### Short Term

- [ ] Improved mobile UX
- [ ] Dark mode
- [ ] Better export formatting
- [ ] Adding CI/CD

### Mid Term

- [ ] Authentication
- [ ] Multi-board dashboard
- [ ] Board duplication
- [ ] Shared workspaces
- [ ] Backup management

### Long Term

- [ ] Real-time collaboration
- [ ] WebSocket synchronization
- [ ] User permissions
- [ ] Activity history
- [ ] Offline-first support

---

## License

MIT