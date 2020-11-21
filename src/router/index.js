import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import TaskView from '@/components/TaskView.vue';
import Tasklist from '@/components/Tasklist.vue';
import CreateTask from '@/components/CreateTask.vue';


export default new Router({
    mode: 'history',
    base: process.env.BABEL_URL,
    routes: [
        { path: '/taskView/:idTask', component: TaskView },
        { path: '/taskList', component: Tasklist },
        { path: '/createTask', component: CreateTask }
    ]
});