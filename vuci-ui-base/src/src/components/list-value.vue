<template>
    <FormItem :label="caption">
        <Select v-model="value">
            <Option v-for="item in choices" :value="item[0]" :key="item[0]">{{ item.length > 1 ? item[1] : item[0] }}</Option>
        </Select>
    </FormItem>
</template>

<script>
export default {
    name: 'ListValue',
    props: {
        caption: String,
        value: String,
        choices: Array
    }
};
</script>
