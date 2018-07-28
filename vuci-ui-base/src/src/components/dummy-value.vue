<template>
    <FormItem :label="caption">
        <Input :readonly=true v-model="value"></Input>
    </FormItem>
</template>

<script>
export default {
    name: 'DummyValue',
    props: {
        caption: String,
        name: String,
        value: String
    }
};
</script>

<style scoped>

</style>
