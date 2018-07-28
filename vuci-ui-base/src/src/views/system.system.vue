<template>
    <UMap caption="System" description="Here you can configure the basic aspects of your device like its hostname or the timezone." config="system">
        <TypedSection v-for="s in system" :session="s" :key="s['.name']" caption="System Properties" type="system">
            <Tabs value="general">
                <TabPane label="General" name="general">
                    <DummyValue caption="Local Time" :value="localtime"></DummyValue>
                    <InputValue caption="Hostname" :value="s.hostname"></InputValue>
                </TabPane>
                <TabPane label="Log" name="log">
                    <InputValue caption="Timezone" :value="s.timezone"></InputValue>
                    <InputValue caption="Zonename" :value="s.zonename"></InputValue>
                    <ListValue caption="Log output level" :value="s.conloglevel" :choices="choices"></ListValue>
                </TabPane>
            </Tabs>
        </TypedSection>
        <NamedSection caption="Time Synchronization" v-if="system.hasOwnProperty('ntp')">
            <InputValue caption="Enabled" :value="system.ntp.enabled"></InputValue>
        </NamedSection>
    </UMap>
</template>

<script>
    export default {
        data() {
            return {
                localtime: (new Date()).toLocaleString(),
                choices: [['8', 'Debug'], ['7', 'Info'], ['6', 'Notice'], ['5', 'Warning'], ['4', 'Error'], ['3', 'Critical'], ['2', 'Alert'], ['1', 'Emergency']],
                system: {}
            }
        },
        mounted() {
            this.$uci.load('system').then((r) => {
                this.system = this.$uci.get(r);
            });
        }
    }
</script>
