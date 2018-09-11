<template>
    <dashboard v-if="authenticated" :title="title" :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent" @select="onSelect" :selected="selected"/>
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
            },
            onSelect(selected) {
                //debugger
                this.selected = selected;
            }
        },
        data() {
			return {
                selected: void 0,
                layouts: {
                    
                    'xs,sm,md,lg,xl': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 2,
                                "x": 2,
                                "y": 0,
                                "w": 3,
                                "h": 6,
                                "available": false,
                                "comp": "donate"
                            },
                            {
                                "id": 4,
                                "x": 5,
                                "y": 0,
                                "w": 3,
                                "h": 6,
                                "available": false,
                                "comp": "balance"
                            },
                            {
                                "id": 3,
                                "x": 2,
                                "y": 6,
                                "w": 6,
                                "h": 9,
                                "available": false,
                                "comp": "payment"
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
