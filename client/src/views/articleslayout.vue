<template>
    <dashboard v-if="authenticated" :title="title" :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent" @date-changed="selected_date = arguments[0]" :date="selected_date"/>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
        /* computed: {
            title() {
                this.route.view === this.component_name && (document.title = 'Статьи');
            }
        }, */
        methods: {
            getTitle() {
                return 'Статьи';
            }
        },
        data() {
			return {
                selected_date: void 0,
                layouts: {
                    'md': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 1,
                                "x": 1,
                                "y": 0,
                                "w": 2,
                                "h": 15,
                                "available": false,
                                "comp": "articlescontent"
                            },
                            {
                                "id": 2,
                                "x": 3,
                                "y": 0,
                                "w": 6,
                                "h": 15,
                                "available": false,
                                "comp": "news"
                            }
                        ]
                    },
                    'sm,xs': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 1,
                                "x": 0,
                                "y": 0,
                                "w": 3,
                                "h": 15,
                                "available": false,
                                "comp": "articlescontent"
                            },
                            {
                                "id": 2,
                                "x": 3,
                                "y": 0,
                                "w": 7,
                                "h": 15,
                                "available": false,
                                "comp": "news"
                            }
                        ]
                    },
                    'lg,xl': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 1,
                                "x": 1,
                                "y": 0,
                                "w": 2,
                                "h": 15,
                                "available": false,
                                "comp": "articlescontent"
                            },
                            {
                                "id": 2,
                                "x": 3,
                                "y": 0,
                                "w": 4,
                                "h": 15,
                                "available": false,
                                "comp": "news"
                            },
                            {
                                "id": 4,
                                "x": 7,
                                "y": 0,
                                "w": 2,
                                "h": 9,
                                "available": false,
                                "comp": "calendar"
                            }
                        ]
                    }
                },
				
			}
		}
    }
</script>

<style scoped>
    .v-card {
        margin: auto;
    } 
</style>
