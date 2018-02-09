<template>
    <div>
        <h1>Kernel Log</h1>
        <Input v-model="log" type="textarea" :autosize="{minRows: 10, maxRows: 25}" readonly></Input>
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
                log: ''
            }
        },

        mounted: function() {
            this.$ubus.call('vuci.system', 'dmesg').then((r) => {
                if (r[0].log) {
                    this.log = r[0].log;
                }
            });
        }
    }
</script>
