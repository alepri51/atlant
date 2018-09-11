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
            <table class="ui definition table">
                <thead>
                    <tr>
                
                        <th style="pointer-events: all; width: 250px">
                            <dropdown-filter class="primary--text" inline :selected-index="0" label="Сортировка" header="параметры сортировки" filter-icon="fas fa-sort" :items="sort"/>
                        </th>
                        <th>Дата</th>
                        <th>Состояние</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="elevation-1">
                        <td><i class="shadow fas fa-donate icon primary--text"/>Клубный взнос</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>75</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-image icon primary--text"/>Лэндинг</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>10</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-sign-in-alt icon primary--text"/>Поступление от партнера</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>10</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-sign-out-alt icon primary--text"/> Перевод партнеру</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>10</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-donate icon primary--text"/>Клубный взнос</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>75</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-image icon primary--text"/>Лэндинг</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>10</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-sign-in-alt icon primary--text"/>Поступление от партнера</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>10</td>
                    </tr>
                    <tr>
                        <td><i class="shadow fas fa-sign-out-alt icon primary--text"/> Перевод партнеру</td>
                        <td>10.10.2018 13:45</td>
                        <td>выполнен успешно</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>10</td>
                    <tr v-for="(item, inx) in filter" :key="inx" style="cursor: pointer" :class="{ 'elevation-1': hovered === item._id}" @mouseover="hovered = item._id" @mouseout="hovered = void 0">
                        <td class="">
                            <v-icon small class="shadow icon" :color="item.items.length === 1 ? item.items[0].product.color : 'primary'" :class="item.items.length === 1 ? item.items[0].product.icon : 'fas fa-file-invoice-dollar'"/>
                            {{ item.items.length === 1 ? item.items[0].product.name : `Платеж № ${item.number}` }}
                        </td>
                        <td>{{ new Date(item.date).toLocaleString() }}</td>
                        <td>{{ item.state}}</td>
                        <td style="text-align: right"><i class="shadow fas fa-dollar-sign icon green--text text--darken-2"></i>{{ item.sum }}</td>
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
                return this.raw_data;
            }
        },
        methods: {
        },
        created() {
        },
        data() {
            return {
                page: 1,
                sort: [
                    { text: 'по умолчанию' },
                    { text: 'по дате' },
                    { text: 'по сумме' }
                ]
            }
        }
    }
</script>

<style scoped>

    .top-dial {
        margin-top: 24px;
    }

</style>