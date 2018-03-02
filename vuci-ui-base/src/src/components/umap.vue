<template>
    <Form :model="formData" :label-width="80">
        <Card v-for="item in umap" :key="item.title">
            <p slot="title">{{item.title}}</p>
            <Tabs v-if="item.tabs && item.tabs.length > 0" :value="item.tabs[0].name" type="card" :animated="false">
                <TabPane v-for="tab in item.tabs" :label="tab.label" :name="tab.name" :key="tab.name">
                    <FormItem v-for="o in tab.options" :label="o.label" :key="o.name">
                        <Input v-if="o.widget === 'input'" v-model="formData[o.name]" :readonly="o.readonly"></Input>
                        <Select v-else-if="o.widget === 'select'" v-model="formData[o.name]">
                            <Option v-for="c in o.choices" :value="c[0]" :key="c[0]">{{ c.length === 2 ? c[1] : c[0] }}</Option>
                        </Select>
                    </FormItem>
                </TabPane>
            </Tabs>
            <FormItem v-for="o in item.options" :label="o.label" :key="o.name">
                <Input v-if="o.widget === 'input'" v-model="formData[o.name]" :readonly="o.readonly"></Input>
                <Select v-else-if="o.widget === 'select'" v-model="formData[o.name]">
                    <Option v-for="c in o.choices" :value="c[0]" :key="c[0]">{{ c.length === 2 ? c[1] : c[0] }}</Option>
                </Select>
            </FormItem>
        </Card>
    </Form>
</template>

<script>
export default {
    name: 'UMap',
    props: {
        title: String,
        config: String,
        umap: Array
    },
    data () {
        return {
            formData: {
                localtime: '2018/02/27 12:31:58 UTC',
                hostname: 'OpenWrt',
                timezone: 'UTC'
            }
        }
    },

    created: function() {
    },

    mounted: function() {
        this.$ubus.call('uci', 'get', {config: this.config}).then((r) => {
            console.log(r);
        });
    }
};
</script>

<style scoped>
    .card {
        margin: 10px;
    }

    .ivu-tabs {
        overflow: visible;
    }
</style>
