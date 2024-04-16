import {RouteRecordRaw} from 'vue-router';

import Home from './views/HomeView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/file',
        name: 'File',
        component: () => import('./views/FileView.vue')
    }
];

export default routes;