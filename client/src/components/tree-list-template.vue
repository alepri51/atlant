

<script>
    export default {
        template: `
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
        `
    }
</script>


<style scoped>
    .root {
        display: list-item;
        table-layout: fixed;
        list-style-type: none;
        list-style-position: outside;
    }
</style>
