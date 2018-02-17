<template>
    <div>
        <h1>Processes</h1>
        <StatusTable title="This list gives an overview over currently running system processes and their status.":columns="columns" :data="processes"></StatusTable>
    </div>
</template>

<style scoped>
    .card {
        margin: 20px;
    }
</style>

<script>
    export default {
        data () {
            return {
                loading: true,
                columns: [
                    {title: 'PID', key: 'pid', width: 70},
                    {title: 'Owner', key: 'user', width: 90},
                    {title: 'Command', key: 'command'},
                    {title: 'CPU usage', key: 'cpu_percent', width: 100, render: (h, params) => params.row.cpu_percent + '%'},
                    {title: 'Memory usage', key: 'vsize_percent', width: 130, render: (h, params) => params.row.vsize_percent + '%'},
                    {title: '', key: 'pid', width: 130, render: (h, params) => {
                        return h('Dropdown', {
                                    props: {trigger: 'click'},
                                    on: {
                                        'on-click': (name) => this.signal(parseInt(name), params.row.pid)
                                    }
                                }, [
                                    h('Button', {props: {type: 'primary'}}, ['Signal...', h('Icon', {props: {type: 'arrow-down-b'}})]),
                                    h('DropdownMenu', {slot: 'list'}, [
                                        h('DropdownItem', {props: {name: '1'}}, 'Hang Up'),
                                        h('DropdownItem', {props: {name: '15'}}, 'Terminate'),
                                        h('DropdownItem', {props: {name: '9'}}, 'Kill')
                                    ])
                            ]);
                    }}
                ],
                processes: []
            }
        },

        methods: {
            signal(signum, pid) {
                this.$ubus.call('system', 'signal', {pid: pid, signum: signum}).then((r) => {
                    this.$Message.info('Successed');
                });
            }
        },

        mounted: function() {
            this.$ubus.call('vuci.system', 'process_list').then((r) => {
                if (r[0].processes) {
                    this.processes = r[0].processes;
                    this.loading = false;
                }
            });
        }
    }
</script>
