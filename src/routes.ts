import {RouteRecordRaw} from 'vue-router';

import FileView from './views/FileView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'file',
        component: FileView
    },
];

export default routes;