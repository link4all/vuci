import Vue from 'vue'
import App from './App'
import router from './router'
import ubus from './plugins/ubus.js'
import session from './plugins/session.js'
import system from './plugins/system.js'
import uci from './plugins/uci.js'
import {
    locale, Layout, Sider, Card, Form, FormItem, Input, Icon, Button, Row, Col, Menu, Submenu, MenuItem,
    Table, Spin, Modal, Message, Progress, Dropdown, DropdownMenu, DropdownItem, Tabs, TabPane,
    Breadcrumb, BreadcrumbItem, Select, Option
} from 'iview'
import 'iview/dist/styles/iview.css'
import lang from 'iview/dist/locale/en-US';
import store from './store'
import '@zhaojh329/string.format.js'
import { mapGetters } from 'vuex'
import StatusList from './components/status-list.vue';
import StatusTable from './components/status-table.vue';
import UMap from './components/umap.vue';
import TypedSection from './components/typed-section.vue';
import DummyValue from './components/dummy-value.vue';
import InputValue from './components/input-value.vue';
import ListValue from './components/list-value.vue';
import NamedSection from './components/named-section.vue';

Vue.config.productionTip = false

Vue.use(ubus);
Vue.use(session);
Vue.use(system);
Vue.use(uci);

// configure language
locale(lang);

Vue.component('Layout', Layout);
Vue.component('Sider', Sider);
Vue.component('Card', Card);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Icon', Icon);
Vue.component('Button', Button);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('MenuItem', MenuItem);
Vue.component('Table', Table);
Vue.component('Spin', Spin);
Vue.component('Progress', Progress);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Select', Select);
Vue.component('Option', Option);

Vue.component('StatusList', StatusList);
Vue.component('StatusTable', StatusTable);
Vue.component('UMap', UMap);
Vue.component('TypedSection', TypedSection);
Vue.component('DummyValue', DummyValue);
Vue.component('InputValue', InputValue);
Vue.component('ListValue', ListValue);
Vue.component('NamedSection', NamedSection);

Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

router.beforeEach((to, from, next) => {
    if (to.path === '/login')
        sessionStorage.removeItem('_ubus_rpc_session');

    if (!sessionStorage.getItem('_ubus_rpc_session') && to.path !== '/login')
        next('/login')
    else
        next()
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App),
    computed: {
        ...mapGetters({
            menus: 'getMenus',
            routes: 'getRoutes',
            logged: 'isLogged'
        })
    },
    mounted: function() {
        if (this.menus && this.logged) {
            this.$router.addRoutes(this.routes);
        }

        this.$session.startHeartbeat();
    }
});
