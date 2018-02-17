<template>
    <Card :bordered="false" class="card">
        <p slot="title">{{ title }}</p>
        <Table :columns="columns" :data="data"></Table>
    </Card>
</template>

<script>
export default {
    name: 'StatusTable',
    props: {
        title: String,
        columns: Array,
        data: Array
    }
};
</script>

<style scoped>
    .card {
        margin: 10px;
    }
</style>
