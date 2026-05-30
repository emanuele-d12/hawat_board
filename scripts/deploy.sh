#!/bin/bash

set -e

echo "=== DEPLOY START ==="

OLD_COMMIT=$(git rev-parse HEAD)

git fetch origin
git reset --hard origin/prod

cp frontend/.env.prod frontend/.env
cp backend/.env.prod  backend/.env

NEW_COMMIT=$(git rev-parse HEAD)

echo "OLD COMMIT: $OLD_COMMIT"
echo "NEW COMMIT: $NEW_COMMIT"

FRONTEND_CHANGED=false
BACKEND_CHANGED=false

FRONTEND_DEPS_CHANGED=false
BACKEND_DEPS_CHANGED=false

if git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT" | grep -q '^frontend/'; then
    FRONTEND_CHANGED=true
fi

if git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT" | grep -q '^backend/'; then
    BACKEND_CHANGED=true
fi

if git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT" | grep -qE '^frontend/package(-lock)?\.json$'; then
    FRONTEND_DEPS_CHANGED=true
fi

if git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT" | grep -qE '^backend/package(-lock)?\.json$'; then
    BACKEND_DEPS_CHANGED=true
fi

echo "Frontend changed: $FRONTEND_CHANGED"
echo "Backend changed: $BACKEND_CHANGED"

echo "Frontend deps changed: $FRONTEND_DEPS_CHANGED"
echo "Backend deps changed: $BACKEND_DEPS_CHANGED"

#
# FRONTEND
#

if [ "$FRONTEND_CHANGED" = true ]; then

    echo "=== FRONTEND ==="

    cd frontend

    if [ "$FRONTEND_DEPS_CHANGED" = true ]; then
        npm ci
    fi

    npm run build

    rm -rf /var/www/hawat_board/*
    cp -r dist/* /var/www/hawat_board/

    cd ..
fi

#
# BACKEND
#

if [ "$BACKEND_CHANGED" = true ]; then

    echo "=== BACKEND ==="

    cd backend

    if [ "$BACKEND_DEPS_CHANGED" = true ]; then
        npm ci
    fi

    npm run build

    pm2 restart hawat-board

    cd ..
fi

echo "=== DEPLOY DONE ==="