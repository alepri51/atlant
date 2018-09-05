<template>
    <widget name="qr" justify-center align-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h3 class="primary--text">
                    <v-icon color="primary" class="mr-2 shadow">fas fa-qrcode</v-icon>
                    {{ `QR-код ${filter.name}:` }}
                </h3>
            </v-layout>
        </div>

        <v-divider slot="divider"/>

        <v-layout column align-center>
            <qr :text="`https://atlant.club/?ref=${filter.ref}`" :size="100" class="QR"></qr>

            <br>

            <h4>
                <a :href="`https://atlant.club/?ref=${filter.ref}`" target="_blank">go to atlant.club: {{filter.ref}}</a>
            </h4>
        </v-layout>
    </widget>
</template>

<script>
    import Widget from './class_widget';
    import VueQRCodeComponent from 'vue-qrcode-component'

    export default {
        extends: Widget,
        props: ['selected'],
        components: {
            qr: VueQRCodeComponent
        },
        data: () => 
        {
            return {
                entity: 'member'
            }
        },
        computed: {
            endpoint() {
                //debugger
                return `${this.component_name}${ this.component_id ? ':' + this.component_id : '' }`;
            },
            filter() {
                //debugger
                return this.entities.member ? this.entities.member[this.selected] : {};
            }
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<style scoped>
    
</style>

