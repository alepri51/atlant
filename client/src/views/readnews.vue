<template>
    <dashboard v-if="true"  :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent"/>
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
                    'xs,md,sm,lg,xl': {
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
                                "comp": "singlenews"
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
