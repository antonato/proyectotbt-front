import TaskView from '@/components/TaskView.vue';
import Tasklist from '@/components/Tasklist.vue';
import CreateTask from '@/components/CreateTask.vue';

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
    { path: '/taskView/:idTask', component: TaskView },
    { path: '/taskList', component: Tasklist },
    { path: '/createTask', component: CreateTask }
];

export const router = new VueRouter({
    base: 'public', 
    mode: 'history',
    routes
})

export default router