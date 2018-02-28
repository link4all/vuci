<template>
    <div>
        <Input v-model="log" type="textarea" :autosize="{minRows: 10, maxRows: 25}" readonly></Input>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                log: ''
            }
        },

        mounted: function() {
            this.$ubus.call('vuci.system', 'syslog').then((r) => {
                if (r.log) {
                    this.log = r.log;
                }
            });
        }
    }
</script>
