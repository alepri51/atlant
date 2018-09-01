<template>
    <div>
        <sui-list-item v-for="(item, inx) in items" :key="inx">
            <sui-list-icon :name="item.icon"/>

            <sui-list-content>
                <sui-list-header>{{ item.title }}</sui-list-header>
                <sui-list-description>{{ item.description }}</sui-list-description>
                <sui-list-list v-if="item.items && item.items.length">
                    <tree-list :items="item.items"/>
                </sui-list-list>
            </sui-list-content>
        </sui-list-item>
    </div>
</template>

<script>
    
    export default {
        name: 'tree-list',
        props: ['items']
    }
</script>


<style scoped>
</style>
