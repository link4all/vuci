export default {
    path: '/demo/demo',
    component: () => import(/* webpackChunkName: "demo.demo" */ '@/apps/demo/demo.vue')
};