<template>
    <widget :name="`баланс`" justify-center align-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="primary--text">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-hand-holding-usd</v-icon>
                    Баланс:
                </h2>
                


            </v-layout>   
            
        </div>

        

        <v-divider slot="divider"/>

        <!-- <v-layout class="" column justify-center align-center> -->
            <div class="ui statistics ma-2">
                <div class="statistic  ">
                    <div class="value">
                        <i class="shadow fab fa-btc icon green--text text--darken-2"></i> {{ filter.total }}
                    </div>
                    <div class="label">
                        Всего
                    </div>
                </div>
                <!-- <div class="statistic  ">
                    <div class="value red--text text--darken-2">
                        <i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i> -5
                    </div>
                    <div class="label">
                        За неделю
                    </div>
                </div>
                <div class="statistic ">
                    <div class="value">
                        <i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i> 20
                    </div>
                    <div class="label">
                        За месяц
                    </div>
                </div> -->
            </div>
        <!-- </v-layout>    -->

    </widget>        
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        computed: {
            filter() {
                return this.raw_data[0] || {};
            },
            cache() {
                return !this.needToUpdate;
            }
        },
        methods: {
            onEvent(data) {
                debugger
                console.log('SOCKET UPDATE balance DATA:', data);
                this.needToUpdate = true;
                this.load();                        
            }

        },
        created() {
        },
        data() {
            return {
                needToUpdate: false
            }
        }
    }
</script>

<style scoped>
    .ui.statistics:after {
        display: none!important;
    }
</style>