<template>
    <widget :name="`партнеры (${filter.length})`" wrap justify-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="primary--text">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-users</v-icon>
                    {{ `Партнеры ${ member.name }:` }}
                </h2>
            </v-layout>   
            <div>
                

            </div>    
        </div>
        
        <v-divider slot="divider" class="mb-2"/>

        <v-flex v-for="(item, inx) in filter" :key="inx" style="max-width: 250px">
            
            <v-card :width="200" hover @click.native="onSelect(item._id)" @mouseover="active = inx" @mouseout="active = void 0">
                <v-card-title style="text-align: center">
                    <v-icon class="shadow mr-4" size="72" :color="active === inx ? 'accent' : 'primary'">far fa-user-circle</v-icon>
                    <qr :text="`https://atlant.club/?ref=${item.ref}`" :size="70" class="QR"></qr>
                </v-card-title>
                
                <v-divider/>

                <v-card-text>
                    <div class="headline">{{ item.name }}</div>
                    <div>{{ `email: ${item.email}` }}</div>
                    <div>{{ `реферальный код: ${item.ref}` }}</div>
                </v-card-text>

                <v-divider/>
                <v-card-actions>
                  <div class="secondary--text">
                    <v-icon small class="secondary--text shadow">fas fa-users</v-icon>
                    {{ item.referals ? item.referals.length : 0 }}
                  </div>
              </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex v-if="!filter.length">
            <sui-card class="elevation-0 not-found">
                <sui-card-content>
                    <sui-card-header>{{ `Партнеров не найдено` }}</sui-card-header>
                    <!-- <sui-card-meta><small>{{ new Date(date).toLocaleDateString() }}</small></sui-card-meta> -->
                </sui-card-content>
            </sui-card>
        </v-flex>
        
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
        data: () => ({
            active: void 0
        }),
        computed: {
            member() {
                return (this.entities.member && this.entities.member[this.selected]) || {};
            },
            filter() {
                return this.member.referals ? this.member.referals.map(id => this.entities.member[id]) : [];
            }
        },
        methods: {
            onSelect(selected) {
                this.execute({ endpoint: `structure:${selected}.expand`, repeatOnError: true });
                this.$emit('select', selected);
            }
        }
    }
</script>


<style scoped>
    .v-card, .ui.card {
        margin: auto;
    }

    .embed-icon {
        font-family: "Font Awesome 5 Free"!important;
    }

    .embed-icon::before {
        font-size: 4rem!important;
    }
</style>
