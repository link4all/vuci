<template>
    <div>
        <StatusTable title="ARP" :columns="columns_arp" :data="data_arp"></StatusTable>
        <StatusTable title="Active IPv4-Routes" :columns="columns_routes" :data="data_routes"></StatusTable>
        <StatusTable title="Active IPv6-Routes" :columns="columns_routes6" :data="data_routes6"></StatusTable>
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
                columns_arp: [
                    {title: 'IPv4-Address', key: 'ipaddr'},
                    {title: 'MAC-Address', key: 'macaddr'},
                    {title: 'Interface', key: 'device'}
                ],
                data_arp: [],
                columns_routes: [
                    {title: 'Target', key: 'target'},
                    {title: 'Gateway', key: 'nexthop'},
                    {title: 'Metric', key: 'metric'},
                    {title: 'Interface', key: 'device'}
                ],
                data_routes: [],
                columns_routes6: [
                    {title: 'Target', key: 'target'},
                    {title: 'Gateway', key: 'nexthop'},
                    {title: 'Source', key: 'source'},
                    {title: 'Metric', key: 'metric'},
                    {title: 'Interface', key: 'device'}
                ],
                data_routes6: []
            }
        },

        mounted: function() {
            let req = [{
                object: 'vuci.network',
                method: 'arp_table'
            }, {
                object: 'vuci.network',
                method: 'routes'
            }, {
                object: 'vuci.network',
                method: 'routes6'
            }];

            this.$ubus.callBatch(req).then((r) => {
                if (r) {
                    this.data_arp = r[0].entries;
                    this.data_routes = r[1].routes;
                    this.data_routes6 = r[2].routes;
                }

                this.loading = false;
            });
        }
    }
</script>
