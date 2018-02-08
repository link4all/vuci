import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import apps from '@/apps'

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
                    path: '/status/overview',
                    component: () => import(/* webpackChunkName: "status.overview" */ '@/views/status.overview.vue'),
                }, {
                    path: '/status/routes',
                    component: () => import(/* webpackChunkName: "status.routes" */ '@/views/status.routes.vue'),
                }
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }];
        routes[0].children = routes[0].children.concat(apps);
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
