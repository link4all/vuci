import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    addMenus (state, menus) {
        state.menus = menus;
    },
    setLogged (state) {
        state.logged = true;
    }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
}

// getters are functions
const getters = {
    isLogged: state => state.logged,
    getMenus: state => state.menus,
    getRoutes: state => {
        let routes = [{
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
            children: [
                {
                    name: 'Overview',
                    path: '/status/overview',
                    component: () => import(/* webpackChunkName: "status.overview" */ '@/views/status.overview.vue'),
                }, {
                    name: 'Routes',
                    path: '/status/routes',
                    component: () => import(/* webpackChunkName: "status.routes" */ '@/views/status.routes.vue'),
                }, {
                    name: 'System Log',
                    path: '/status/syslog',
                    component: () => import(/* webpackChunkName: "status.syslog" */ '@/views/status.syslog.vue'),
                }, {
                    name: 'Kernel Log',
                    path: '/status/dmesg',
                    component: () => import(/* webpackChunkName: "status.dmesg" */ '@/views/status.dmesg.vue'),
                }, {
                    name: 'Processes',
                    path: '/status/processes',
                    component: () => import(/* webpackChunkName: "status.processes" */ '@/views/status.processes.vue'),
                }, {
                    name: 'Realtime Graphs',
                    path: '/status/realtime',
                    component: () => import(/* webpackChunkName: "status.realtime" */ '@/views/status.realtime.vue'),
                }, {
                    name: 'System',
                    path: '/system/system',
                    component: () => import(/* webpackChunkName: "system.system" */ '@/views/system.system.vue'),
                }
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }];

        return routes;
    }
}
// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    plugins: [createPersistedState()]
})
