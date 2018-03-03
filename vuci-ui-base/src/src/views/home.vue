<template>
    <Layout style="height: 100%">
         <Sider style="overflow: scroll; height: 100%">
            <Menu theme="dark" width="auto" @on-select="changeMenu" style="margin-top: 30px" accordion>
                <Submenu v-for="menu in menus" :name="menu.path" :key="menu.path">
                    <template slot="title">{{menu.title}}</template>
                    <MenuItem v-for="item in menu.childs" :name="item.path" :key="item.path">{{item.title}}</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout>
            <Header style="padding: 5px">
                <Row type="flex">
                     <Col span="8">
                         <Breadcrumb>
                            <BreadcrumbItem v-for="(item, index) in currentPathTitle" :key="index + item">
                                <span style="font-size: 22px; color: black;">{{ item }}</span>
                            </BreadcrumbItem>
                         </Breadcrumb>
                    </Col>
                    <Col span="8" offset="8">
                        <div style="right: 15px; position: absolute;">
                            <Button type="primary" @click="reboot">Reboot</Button>
                            <Button type="primary" @click="logout">Logout</Button>
                        </div>
                    </Col>
                </Row>
            </Header>
            <Content class="content">
                <router-view></router-view>
            </Content>
            <Footer style="text-align: center;">2017 &copy; Jianhui Zhao</Footer>
        </Layout>
        <Spin fix v-if="rebooting" style="z-index:10000">
            <Icon type="load-a" size=100 class="loading"></Icon>
            <div>Rebooting...</div>
        </Spin>
    </Layout>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            rebooting: false,
            currentPathTitle: ['status', 'overview']
        }
    },
    computed: {
        ...mapGetters({
            menus: 'getMenus',
            routes: 'getRoutes'
        })
    },

    methods: {
        changeMenu (name) {
            this.$router.push(name);
        },
        logout() {
            sessionStorage.removeItem('_ubus_rpc_session');
            this.$router.push('/login');
        },
        reboot() {
            this.$Modal.confirm({
                title: 'Reboot',
                content: '<p>Are you sure you want to restart your device?</p>',
                onOk: () => {
                    this.$ubus.call('rpc-sys', 'reboot').then((r) => {
                        sessionStorage.removeItem('_ubus_rpc_session');
                        window.setTimeout(() => {
                            let interval = window.setInterval(() => {
                                axios.get('/').then((r) => {
                                    window.clearInterval(interval);
                                    window.location.href = '/';
                                });
                            }, 5000);
                        }, 5000);
                    });

                    window.setTimeout(() => {
                        this.rebooting = true;
                    }, 500);
                }
            });
        }
    },
    watch: {
        '$route' (to) {
            this.currentPathTitle = [ ];
            this.menus.forEach((menu) => {
                if (to.path.startsWith(menu.path)) {
                    this.currentPathTitle.push(menu.title);
                    menu.childs.forEach((menu) => {
                        if (menu.path === to.path)
                            this.currentPathTitle.push(menu.title);
                    });
                }
            });
        }
    },
    mounted: function() {
        this.$router.push('/status/overview');
    }
}

</script>

<style scoped>
    .content {
        height: 100%;
        margin: 5px;
        border-radius: 4px;
        padding: 5px;
        overflow: scroll;
        background-color: white;
    }

    .loading {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
