<template>
    <dashboard v-if="true"  :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent" @date-changed="selected_date = arguments[0]" :date="selected_date"/>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
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
                                "id": 2,
                                "x": 1,
                                "y": 0,
                                "w": 8,
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
                                "id": 2,
                                "x": 0,
                                "y": 0,
                                "w": 10,
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
                                "id": 2,
                                "x": 1,
                                "y": 0,
                                "w": 6,
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
