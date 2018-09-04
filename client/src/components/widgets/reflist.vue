<template>
    <widget name="список" >
        <div slot="header">
            <v-layout class="ma-2">
                <h3 class="primary--text">
                    <v-icon color="primary" class="mr-2 shadow">fas fa-list</v-icon>
                    Список:
                </h3>
            </v-layout>
        </div>

        <v-divider slot="divider"/>

        <div class="ui list ma-2 primary--text">
            <div class="item" v-for="item in filter">
                <i class="far fa-user-circle icon "></i>
                <div class="content">
                <div class="header primary--text">{{ item.name }}</div>
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
            endpoint() {
                //debugger
                return `${this.component_name}${ this.component_id ? ':' + this.component_id : '' }`;
            },
            filter() {
                debugger
                let content = this.raw_data.find(item => item._id === this.selected);
                
                return content && content.list.members && content.list.members.map(member => this.entities.member[member]);
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

