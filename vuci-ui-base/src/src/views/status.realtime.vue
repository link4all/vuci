<template>
    <Tabs value="load">
        <TabPane label="Load" name="load">Load</TabPane>
        <TabPane label="Traffic" name="traffic">
            Realtime Traffic
            <Tabs type="card" @on-click="chartTraffic">
                <TabPane v-for="dev in devices" :label="dev" :name="dev" :key="dev">
                    <canvas ref="traffic" :dev="dev"></canvas>
                     <Row>
                        <Col span="8">Inbound: {{curRx | tokbit}} kbit/s ({{curRx | tokbyte}} KB/s)</Col>
                        <Col span="8">Average: {{avgRx | tokbit}} kbit/s ({{avgRx | tokbyte}} KB/s)</Col>
                        <Col span="8">Peak: {{peakRx | tokbit}} kbit/s ({{peakRx | tokbyte}} KB/s)</Col>
                     </Row>
                     <Row>
                        <Col span="8">Outbound: {{curTx | tokbit}} kbit/s ({{curTx | tokbyte}} KB/s)</Col>
                        <Col span="8">Average: {{avgTx | tokbit}} kbit/s ({{avgTx | tokbyte}} KB/s)</Col>
                        <Col span="8">Peak: {{peakTx | tokbit}} kbit/s ({{peakTx | tokbyte}} KB/s)</Col>
                     </Row>
                </TabPane>
            </Tabs>
        </TabPane>
        <TabPane label="Wireless" name="wireless">wireless</TabPane>
        <TabPane label="Connections" name="connections">connections</TabPane>
    </Tabs>
</template>

<script>
    export default {
        data() {
            return {
                devices: [],
                curRx: 0,
                curTx: 0,
                peakRx: 0,
                peakTx: 0,
                avgRx: 0,
                avgTx: 0,
                curDev: null
            }
        },
        filters: {
            tokbit: (v) => (v * 8 / 1024).toFixed(2),
            tokbyte: (v) => (v / 1024).toFixed(2)
        },
        methods: {
            chartTraffic(name) {
                this.avgRx = 0;
                this.avgTx = 0;
                this.peakRx = 0;
                this.peakTx = 0;
                this.curDev = name;
            },
            chart() {
                if (!this.curDev)
                    return;

                this.$ubus.call('vuci.network.bwmon', 'statistics', {device: this.curDev}).then((r) => {
                    if (r[0].statistics) {
                        if (!this.$refs['traffic'] || this.$refs['traffic'].length === 0)
                            return;

                        let rxBytes = r[0].statistics.rx_bytes;
                        let txBytes = r[0].statistics.tx_bytes;

                        this.curRx = rxBytes[rxBytes.length - 1];
                        this.curTx = txBytes[txBytes.length - 1];

                        let dataMax = 0;
                        let peakRx = 0;
                        let peakTx = 0;
                        let avgRx = 0;
                        let avgTx = 0;

                        for (let i = 0; i < rxBytes.length; i++) {
                            dataMax = Math.max(dataMax, rxBytes[i]);
                            dataMax = Math.max(dataMax, txBytes[i]);

                            peakRx = Math.max(peakRx, rxBytes[i]);
                            peakTx = Math.max(peakTx, txBytes[i]);

                            if (i > 0) {
                                avgRx = (avgRx + rxBytes[i]) / 2;
                                avgTx = (avgTx + txBytes[i]) / 2;
                            } else {
                                avgRx = rxBytes[i];
                                avgTx = txBytes[i];
                            }
                        }

                        this.avgRx = avgRx;
                        this.avgTx = avgTx;
                        this.peakRx = peakRx;
                        this.peakTx = peakTx;

                        let c = null;
                        for (let i = 0; i < this.$refs['traffic'].length; i++) {
                            if (this.$refs['traffic'][i].getAttribute('dev') === this.curDev) {
                                c = this.$refs['traffic'][i];
                                break;
                            }
                        }
                        if (!c)
                            return;

                        let ctx = c.getContext('2d');
                        c.width = 1500;
                        c.height = 400;
                        ctx.lineWidth = 2;

                        let xAxis = c.width - 200;
                        let yAxis = c.height;

                        ctx.font = '20px Georgia';
                        ctx.fillText('Inbound:', xAxis, 40);
                        ctx.fillText('Outbound:', xAxis, 60);

                        ctx.strokeStyle = 'blue';
                        ctx.beginPath();
                        ctx.moveTo(xAxis + 100, 40);
                        ctx.lineTo(xAxis + 150, 40);
                        ctx.stroke();

                        ctx.strokeStyle = '#008000';
                        ctx.beginPath();
                        ctx.moveTo(xAxis + 100, 60);
                        ctx.lineTo(xAxis + 150, 60);
                        ctx.stroke();

                        let pointWidth = xAxis / (rxBytes.length + 1);
                        ctx.beginPath();
                        ctx.strokeStyle = 'blue';
                        ctx.fillStyle = '#9A9AFF50';
                        ctx.lineTo(0, yAxis);
                        for (let i = 0; i < rxBytes.length; i++) {
                            let x = (i + 1) * pointWidth;
                            let y = rxBytes[i] / dataMax * yAxis;
                            ctx.lineTo(x, yAxis - y);
                        }
                        ctx.lineTo(xAxis, yAxis);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();

                        pointWidth = xAxis / (txBytes.length + 1);
                        ctx.beginPath();
                        ctx.strokeStyle = '#008000';
                        ctx.fillStyle = '#9ACD9A50';
                        ctx.lineTo(0, c.height);
                        for (let i = 0; i < txBytes.length; i++) {
                            let x = (i + 1) * pointWidth;
                            let y = txBytes[i] / dataMax * yAxis;
                            ctx.lineTo(x, yAxis - y);
                        }
                        ctx.lineTo(xAxis, yAxis);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();
                    }
                });
            }
        },
        mounted: function() {
            this.$ubus.call('vuci.network.bwmon', 'devices').then((r) => {
                this.devices = r[0].devices;
            });

            window.setInterval(this.chart, 3000);
        }
    }
</script>
