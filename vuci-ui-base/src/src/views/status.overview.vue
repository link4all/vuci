<template>
    <div>
        <h1>Status</h1>
        <StatusList title="System" :data="systemData"></StatusList>
        <StatusList title="Memory" :data="memoryData"></StatusList>
    </div>
</template>

<style scoped>
    .card {
        margin: 10px;
    }
</style>

<script>
    export default {
        data () {
            return {
                systemData: [],
                memoryData: []
            }
        },

        mounted: function() {
            this.$system.getInfo().then((r) => {
                this.systemData = [
                    ['Hostname', r.hostname],
                    ['Model', r.model],
                    ['Firmware Version', r.release.description],
                    ['Kernel Version', r.kernel],
                    ['Local Time', (new Date(r.localtime * 1000)).toUTCString()],
                    ['Uptime', r.uptime],
                    ['Load Average', '%.2f, %.2f, %.2f'.format(r.load[0] / 65535.0, r.load[1] / 65535.0, r.load[2] / 65535.0)]
                ];

                this.memoryData = [
                    ['Total Available', parseFloat(((r.memory.free + r.memory.buffered) / r.memory.total * 100).toFixed(2)), true],
                    ['Free', parseFloat((r.memory.free / r.memory.total * 100).toFixed(2)), true],
                    ['Buffered', parseFloat((r.memory.buffered / r.memory.total * 100).toFixed(2)), true]
                ];
            });
        }
    }
</script>
