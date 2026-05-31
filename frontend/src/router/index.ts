import {
    createRouter,
    createWebHashHistory,
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

            try {
                const board = await createBoard()

                router.push(`/board/${board.uuid}`)
            } catch (error) {
                console.error(error)

                return false
            }
        },
    },
    {
        path: '/board/:boardId',
        component: App,
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router