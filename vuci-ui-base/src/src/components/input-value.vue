<template>
    <FormItem :label="caption">
        <Input v-model="value"></Input>
    </FormItem>
</template>

<script>
export default {
    name: 'InputValue',
    props: {
        caption: String,
        value: String
    }
};
</script>
