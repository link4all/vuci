<template>
    <Form :model="formData" :label-width="80">
        <Card class="card">
            <p slot="title">System Properties</p>
            <Tabs value="general" type="card" :animated="false">
                <TabPane label="General Settings" name="general">
                    <FormItem label="Local Time">
                        <Input v-model="formData.localtime" readonly></Input>
                    </FormItem>
                    <FormItem label="Hostname">
                        <Input v-model="formData.hostname"></Input>
                    </FormItem>
                    <FormItem label="Timezone">
                        <Select v-model="formData.timezone">
                            <Option value="UTC">UTC</Option>
                            <Option value="Africa/Abidjan">Africa/Abidjan</Option>
                            <Option value="Africa/Accra">Africa/Accra</Option>
                            <Option value="Africa/Addis Ababa">Africa/Addis Ababa</Option>
                            <Option value="Africa/Algiers">Africa/Algiers</Option>
                        </Select>
                    </FormItem>
                </TabPane>
                <TabPane label="Logging" name="logging">标签一的内容</TabPane>
                <TabPane label="Language and Style" name="language">标签一的内容</TabPane>
            </Tabs>
        </Card>

        <Card class="card">
            <p slot="title">Time Synchronization</p>
        </Card>
    </Form>
</template>

<style scoped>
    .card {
        margin: 10px;
    }

    .ivu-tabs {
        overflow: visible;
    }
</style>

<script>
    export default {
        data () {
            return {
                formData: {
                    localtime: '2018/02/27 12:31:58 UTC',
                    hostname: 'OpenWrt',
                    timezone: 'UTC'
                }
            }
        },

        mounted: function() {
        }
    }
</script>
