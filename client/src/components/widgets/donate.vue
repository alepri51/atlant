<template>
    <widget name="операции" justify-center align-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="accent--text">
                    <v-icon color="accent" class="mr-2 shadow">fas fa-donate</v-icon>
                    {{ `Клубный взнос:` }}
                </h2>
            </v-layout>
        </div>

        <v-divider slot="divider"/>

        <!-- <v-layout class="" column justify-center align-center> -->
            <!-- <qr :text="`https://atlant.club/?ref=${filter.ref}`" :size="100" class="QR"></qr> -->

            <div class="ui statistics ma-2">
                <div class="statistic  ">
                    <div class="value ">
                        <i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i> 75
                    </div>
                    <div class="label">
                        <v-btn dark color="accent" @click="donate">Сделать взнос</v-btn>
                    </div>
                </div>
                <!-- <div class="statistic  ">
                    <div class="value ">
                        <i class="shadow fab fa-btc icon green--text text--darken-2 mr-1"></i>
                        <i class="shadow fas fa-angle-double-right icon secondary--text mr-1"></i>
                        <i class="shadow far fa-user-circle icon primary--text"></i>
                    </div>
                    <div class="label">
                        <v-btn flat color="accent">Перевести партнеру</v-btn>
                    </div>
                </div> -->
            </div>
            
        <!-- </v-layout> -->
    </widget>
</template>

<script>
    import Widget from './class_widget';
    import VueQRCodeComponent from 'vue-qrcode-component';

    export default {
        extends: Widget,
        components: {
            qr: VueQRCodeComponent
        },
        data: () => 
        {
            return {
                //entity: 'payment'
            }
        },
        computed: {
        },
        methods: {
            donate() {
                this.execute({ 
                    method: 'post', 
                    endpoint: 'donate.prepare',
                    repeatOnError: 403,
                    callback: (response) => {
                        //debugger;
                        if(!response.error) {
                            //console.log(response.data.donate);

                            this.commit('SHOW_MODAL', { donate: response.data.donate });
                            
                            //this.$router.replace('landing');
                        }
                    }    
                });
            }
        },
        watch: {
        }
    }
</script>

<style scoped>
    .ui.statistics:after {
        display: none!important;
    }
</style>

