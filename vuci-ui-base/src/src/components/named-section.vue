<template>
    <Card>
        <p slot="title">{{caption}}</p>
        <slot></slot>
    </Card>
</template>

<script>

export default {
    name: 'NamedSection',
    props: {
        caption: String
    }
};
</script>
