<template>
    <div @keydown.enter="handleSubmit">
        <Card class="login-container">
            <p slot="title">Authorization Required</p>
            <Form ref="form" :model="form" :rules="ruleValidate">
                <FormItem prop="username">
                    <Input type="text" v-model="form.username" size="large" auto-complete="off" placeholder="Enter username...">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Input type="password" v-model="form.password" size="large" auto-complete="off" placeholder="Enter password...">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" long size="large" icon="log-in" @click="handleSubmit">Login</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import * as menu from '../plugins/menu.js'
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                ruleValidate: {
                    username: [
                        {required: true, trigger: 'blur'}
                    ]
                }
            }
        },

        computed: {
            ...mapGetters({
                routes: 'getRoutes'
            })
        },

        methods: {
            ...mapMutations(['addMenus', 'setLogged']),

            handleSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$session.login(this.form.username, this.form.password).then((r) => {
                            menu.loadMenu().then((r) => {
                                this.addMenus(r);
                                this.setLogged();
                                this.$router.addRoutes(this.routes);
                                this.$router.push('/');
                            });
                        }).catch((r) => {
                            this.$Message.error('Login Fail! username or password wrong.');
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-container {
        width: 400px;
        height: 240px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -120px;
    }
</style>
