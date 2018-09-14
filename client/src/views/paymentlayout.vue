<template>
    <dashboard v-if="authenticated" 
        :title="title" 
        :layout="layout" 
        :components="components" 
        :data="{}" 
        @REGISTER-COMPONENT="registerComponent" 
        @page-changed="payment_page = arguments[0]" 
        @select="onSelect" 
        :selected="selected"
        :payment-page="payment_page"
    />
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
        methods: {
            getTitle() {
                return 'Платежи';
            },
            onSelect(selected) {
                //debugger
                this.selected = selected;
            }
        },
        data() {
			return {
                selected: void 0,
                payment_page: 1,
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
                                "w": 2,
                                "h": 6,
                                "available": false,
                                "comp": "donate"
                            },
                            {
                                "id": 4,
                                "x": 4,
                                "y": 0,
                                "w": 4,
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
