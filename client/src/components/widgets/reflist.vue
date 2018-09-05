<template>
    <widget name="список" >
        <div slot="header">
            <v-layout class="ma-2">
                <h3 class="primary--text">
                    <v-icon color="primary" class="mr-2 shadow">fas fa-list</v-icon>
                    {{ `Список ${member.name}:` }}
                </h3>
            </v-layout>
        </div>

        <v-divider slot="divider"/>

        <div class="ui list ma-2 primary--text">
            <div class="item" v-for="(item, inx) in filter" :key="inx">
                <i class="far fa-user-circle icon shadow"></i>
                <div class="content">
                <div class="header primary--text">{{ `${inx + 1}. ${item.name}` }}</div>
                <div class="description">{{ `email: ${item.email}; реферальный код: ${item.ref}` }}</div>
                </div>
            </div>
        </div>
    </widget>
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        props: ['selected'],
        data: () => 
        {
            return {
                entity: 'member'
            }
        },
        computed: {
            member() {
                return this.entities.member ? this.entities.member[this.selected] : {};
            },
            endpoint() {
                //debugger
                return `${this.component_name}${ this.component_id ? ':' + this.component_id : '' }`;
            },
            filter() {
                //debugger
                let content = this.raw_data.find(item => item._id === this.selected);
                
                return content && content.list && content.list.members && content.list.members.map(member => this.entities.member[member]);//.sort((a, b) => a._rel.номер - b._rel.номер);
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

