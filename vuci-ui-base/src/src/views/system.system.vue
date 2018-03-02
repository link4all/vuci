<template>
    <UMap :umap="umap" config="system"></UMap>
</template>

<script>
    export default {
        data () {
            return {
                umap: [
                    {
                        title: 'System Properties',
                        tabs: [
                            {
                                name: 'general',
                                label: 'General Settings',
                                options: [
                                    {
                                        name: 'localtime',
                                        label: 'Local Time',
                                        widget: 'input',
                                        readonly: true
                                    }, {
                                        name: 'hostname',
                                        label: 'Hostname',
                                        widget: 'input'
                                    }, {
                                        name: 'timezone',
                                        label: 'Timezone',
                                        widget: 'select',
                                        choices: [
                                            ['UTC', 'UTC'],
                                            ['Ua', 'UA']
                                        ]
                                    }
                                ]
                            }, {
                                name: 'logging',
                                label: 'Logging'
                            }, {
                                name: 'language',
                                label: 'Language and Style'
                            }
                        ],
                        options: [
                            {
                                name: 'hostname',
                                label: 'Hostname',
                                widget: 'input'
                            }
                        ]
                    }, {
                        title: 'Time Synchronization',
                    }
                ]
            }
        },
    }
</script>
