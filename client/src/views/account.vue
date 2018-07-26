<template>
	<dashboard class="dashboard" :layout="layout" :components="components" :data={} v-resize="onResize" @dreams-update="update"/>
</template>


<script>
	import dashboard from '../components/dashboard';

    export default {
		components: { dashboard },
		methods: {
			onResize() {

			}
        },
        methods: {
            update() {
                this.execute({ 
                    endpoint: 'account:100.default',
                    method: 'get',
                    payload: {hello: 'world'},
                    callback: response => this.commit('ACCOUNT', this.auth.member)
                });
            },
            onResize() {

            }
        },
        activated() {
            this.update();
        },
		data() {
			return {
				layout: {
					cols: 8,
					rows: 7
				},
				components: [
                    {
                        "id": 1,
                        "x": 1,
                        "y": 1,
                        "w": 6,
                        "h": 6,
                        "text": "dreams",
                        "available": false,
                        "comp": "dreams"
                    },
                    {
                        "id": 2,
                        "x": 1,
                        "y": 0,
                        "w": 6,
                        "h": 1,
                        "text": "bio",
                        "available": false,
                        "comp": "bio"
                    }
                ]
			}
		}
	}

</script>

<style>

</style>
