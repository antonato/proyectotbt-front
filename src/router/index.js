import TaskView from '@/components/TaskView.vue';
import Tasklist from '@/components/Tasklist.vue';
import CreateTask from '@/components/CreateTask.vue';

export const routes = [
    { path: '/taskView/:idTask', component: TaskView },
    { path: '/taskList', component: Tasklist },
    { path: '/createTask', component: CreateTask }
];


export default routes