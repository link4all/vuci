<template>
    <Card v-if="session['.type'] == type">
        <p slot="title">{{caption}}</p>
        <slot></slot>
    </Card>
</template>

<script>

export default {
    name: 'TypedSession',
    props: {
        caption: String,
        type: String,
        session: Object
    }
};
</script>
