<template>
    <widget :name="`платежи`" column>
        <div slot="header">
            <v-layout class="ma-2" align-center>
                <h2 class="primary--text mb-0">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-money-bill-alt</v-icon>
                    История платежей:
                </h2>
                
                <v-spacer/>

                <v-pagination
                    v-model="page"
                    :length="14"
                    prev-icon="fas fa-caret-left primary--text"
                    next-icon="fas fa-caret-right primary--text"
                    :total-visible="6"
                />
            </v-layout>   
            
        </div>

        

        <v-divider slot="divider" class="mb-2"/>

        <v-layout class="ma-2">
            <table class="ui definition table" style="max-width: 100%">
                <thead>
                    <tr>
                
                        <th style="pointer-events: all; width: 250px">
                            <dropdown-filter class="primary--text" inline :selected-index="0" label="Сортировка" header="параметры сортировки" filter-icon="fas fa-sort" :items="sort"/>
                        </th>
                        <th>Дата</th>
                        <th>Состояние</th>
                        <th style="text-align: right">Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, inx) in filter" :key="inx" style="cursor: pointer" :class="{ 'elevation-1': hovered === item.id}" @mouseover="hovered = item.id" @mouseout="hovered = void 0">
                        <td class="">
                            <v-icon small class="shadow icon" :color="item.color || 'primary'" :class="item.icon || 'fas fa-file-invoice-dollar'"/>
                            {{ item.type || `Платеж № ${item.id}` }}
                        </td>
                        <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
                        <td>{{ item.status }}</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>{{ item.cost }}</td>
                    </tr>
                    
                </tbody>
            </table>
        </v-layout>
    </widget>        
</template>

<script>
    import Widget from './class_widget';
    import filter from '../elements/filter'

    export default {
        extends: Widget,
        components: {
            'dropdown-filter': filter
        },
        computed: {
            filter() {
                //debugger
                return this.raw_data;
            },
            endpoint() {
                
                return `${this.entity}${ this.component_id ? ':' + this.component_id : '' }/?page=${this.page}`;
            },
        },
        methods: {
        },
        created() {
        },
        data() {
            return {
                hovered: void 0,
                page: 1,
                sort: [
                    { text: 'по умолчанию' },
                    { text: 'по дате' },
                    { text: 'по сумме' }
                ]
            }
        },
        watch: {
            'page': function() {
                this.load();
            }
        }
    }
</script>

<style scoped>

    .top-dial {
        margin-top: 24px;
    }

</style>