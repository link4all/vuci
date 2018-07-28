<template>
    <div>
        <h1>{{caption}}</h1>
        <p>{{description}}</p>
        <Form :label-width="80">
            <slot></slot>
        </Form>
    </div>
</template>

<script>

export default {
    name: 'UMap',
    props: {
        caption: String,
        description: String
    }
};
</script>

<style>
    .ivu-tabs {
        overflow: visible
    }
</style>
