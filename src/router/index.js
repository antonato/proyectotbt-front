import TaskView from '@/components/TaskView.vue';
import Tasklist from '@/components/Tasklist.vue';
import CreateTask from '@/components/CreateTask.vue';
import CreateEmergency from '@/components/CreateEmergency.vue';
import Home from '@/components/Home.vue';
import SearchVolunteer from '@/components/SearchVolunteer.vue';

export const routes = [
    { path: '/taskView/:idTask', component: TaskView },
    { path: '/taskList', component: Tasklist },
    { path: '/createTask', component: CreateTask },
    { path: '/createEmergency', component: CreateEmergency },
    { path: '/searchVolunteer', component: SearchVolunteer },
    { path: '/', component: Home }
];


export default routes