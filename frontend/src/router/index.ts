import { createRouter, createWebHistory} from "vue-router"
import { v4 as uuidv4 } from "uuid"
import App from '../App.vue'

const routes = [
    {
        path: '/',
        redirect: () => `/${uuidv4()}`,
    },
    {
        path: '/:boardId',
        component: App,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router