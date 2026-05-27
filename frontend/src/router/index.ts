import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router"
import App from '../App.vue'
import { createBoard } from "../services/api"

const EmptyComponent = {
    template: '<div></div>',
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: EmptyComponent,

        beforeEnter: async () => {
            const uuid = crypto.randomUUID()

            try {
                await createBoard(uuid)

                return `/${uuid}`
            } catch (error) {
                console.error(error)

                return false
            }
        },
    },
    {
        path: '/:boardId',
        component: App,
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router