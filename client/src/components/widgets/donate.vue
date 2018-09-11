<template>
    <widget name="взнос" justify-center align-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="accent--text">
                    <v-icon color="accent" class="mr-2 shadow">fas fa-exchange-alt</v-icon>
                    {{ `Операции:` }}
                </h2>
            </v-layout>
        </div>

        <v-divider slot="divider"/>

        <v-layout column align-center>
            <!-- <qr :text="`https://atlant.club/?ref=${filter.ref}`" :size="100" class="QR"></qr> -->

            <div class="ui statistics">
                <div class="statistic  ">
                    <div class="value ">
                        <i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i> 75
                    </div>
                    <div class="label">
                        <v-btn dark color="accent">Сделать взнос</v-btn>
                    </div>
                </div>
                <div class="statistic  ">
                    <div class="value ">
                        <i class="shadow fab fa-btc icon green--text text--darken-2 mr-1"></i>
                        <i class="shadow fas fa-angle-double-right icon secondary--text mr-1"></i>
                        <i class="shadow far fa-user-circle icon primary--text"></i>
                    </div>
                    <div class="label">
                        <v-btn flat color="accent">Перевести партнеру</v-btn>
                    </div>
                </div>
            </div>
            
        </v-layout>
    </widget>
</template>

<script>
    import Widget from './class_widget';
    import VueQRCodeComponent from 'vue-qrcode-component'

    export default {
        extends: Widget,
        components: {
            qr: VueQRCodeComponent
        },
        data: () => 
        {
            return {
            }
        },
        computed: {
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<style scoped>
    
</style>

