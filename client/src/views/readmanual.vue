<template>
    <dashboard v-if="true" :title="title" :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent"/>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
        computed: {
            title() {
                document.title = (this.entities.news && this.entities.news[this.component_id] && 'Новость: ' + this.entities.news[this.component_id].title) || 'Чтение';
            }
        },
        data() {
			return {
                selected_date: void 0,
                layouts: {
                    'xs,sm': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 2,
                                "x": 0,
                                "y": 0,
                                "w": 10,
                                "h": 15,
                                "available": false,
                                "comp": "singlemanual"
                            }
                        ]
                    },
                    'md,lg,xl': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 2,
                                "x": 2,
                                "y": 0,
                                "w": 6,
                                "h": 15,
                                "available": false,
                                "comp": "singlemanual"
                            }
                        ]
                    }
                }
				
			}
		}
    }
</script>

<style scoped>
    .v-card {
        margin: auto;
    } 
</style>
