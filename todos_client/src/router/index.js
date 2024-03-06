import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue"
import ToDoForm from "@/views/TodoForm.vue"
import TodosDisplay from "@/views/TodosDisplay.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/",
            name: 'Home',
            component: HomePage
        },
        {
            path:"/add",
            name: "add-todo",
            component: ToDoForm
        },
        {
            path:"/list",
            name: "todo-list",
            component: TodosDisplay
        }
    ]
})

export default router;