<template>
    <widget name="qr" justify-center align-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h3 class="primary--text">
                    <v-icon color="primary" class="mr-2 shadow">fas fa-qrcode</v-icon>
                    QR-код:
                </h3>
            </v-layout>
        </div>

        <v-divider slot="divider"/>

        <qr :text="`https://atlant.club/?ref=${filter.ref}`" :size="100" class="QR"></qr>
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
                return this.entities.member ? this.entities.member[this.auth.member] : {};
            }
        },
        methods: {
        },
        watch: {
        }
    }
</script>

<style scoped>
    .QR {
        color: var(--primary-color);
    }
</style>

