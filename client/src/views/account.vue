<template>
	<dashboard class="dashboard" :layout="layout" :components="components" :data={} v-resize="onResize" />
</template>


<script>
	import dashboard from '../components/dashboard';

    export default {
		components: { dashboard },
		methods: {
			onResize() {

			}
        },
        activated() {
            this.execute({ 
                endpoint: 'account',
                callback: response => this.commit('ACCOUNT', response.data)
            });
        },
		data() {
			return {
				layout: {
					cols: 9,
					rows: 6
				},
				components: [
                    {
                        "id": 2,
                        "x": 1,
                        "y": 0,
                        "w": 6,
                        "h": 6,
                        "text": "GRID",
                        "available": false,
                        "comp": "dreams"
                    },
                    {
                        "id": 3,
                        "x": 7,
                        "y": 0,
                        "w": 1,
                        "h": 2,
                        "text": "GRID",
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
