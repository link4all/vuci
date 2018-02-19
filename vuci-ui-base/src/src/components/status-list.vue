<template>
    <Card class="card">
        <p slot="title">{{title}}</p>
        <div v-for="item in data" :key="item[0]">
            <Row class-name="row">
                <Col span="8">{{ item[0] }}</Col>
                <Col span="16">
                    <Progress v-if="item[2]" :percent=item[1] :stroke-width=12></Progress>
                    <span v-else>{{ item[1] }}</span>
                </Col>
            </Row>
            <hr style="height:1px; border:none; border-top:1px solid #49506050;" />
        </div>
    </Card>
</template>

<script>
export default {
    name: 'StatusList',
    props: {
        title: String,
        data: Array
    }
};
</script>

<style scoped>
    .card {
        margin: 10px;
    }

    .row {
        padding: 10px;
        font-size: 12px;
    }

    .row:hover {
        background-color: #ebf7ff;
    }
</style>
