<template>
    <sui-list class="pa-0 pt-1">
        <sui-list-item v-for="(item, inx) in items" :key="inx">
            <sui-list-icon 
                :name="(item.items && item.items.length) ? closed[item._id] ? 'far fa-caret-right' : 'far fa-caret-down' : 'fab fa-creative-commons-share'" 
                :size="'large'" 
                style="cursor: pointer" 
                class="shadow"
                :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 
                @mouseover="onIn(item)" 
                @mouseout="onOut(item)"
                @click="$set(closed, item._id, !!!closed[item._id]), closed[item._id] && $emit('select', item._id)" 
            />

            <sui-list-content>
                <!-- <sui-list-header>{{ item.title }}</sui-list-header> -->
                <h3 class="mb-1" 
                    style="cursor: pointer" 
                    @click="$emit('select', item._id)" 
                    :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 

                    @mouseover="onIn(item)" @mouseout="onOut(item)"
                >
                    {{ item.title }}
                </h3>
                <sui-list-description>{{ item.description }}</sui-list-description>
                    <!-- <tree-list :items="item.items"/> -->

                <sui-list-list v-if="item.items && item.items.length" v-show="!closed[item._id]" class="pa-0 pt-1">
                    <tree-list :items="item.items" :selected="selected" v-on="$listeners"/>
                </sui-list-list>
            </sui-list-content>
        </sui-list-item>
    </sui-list>
</template>

<script>
    
    export default {
        name: 'tree-list',
        props: ['items', 'selected'],
        data() {
            return {
                hovered: void 0,
                closed: {}
            }
        },
        methods: {
            onIn(item) {
                this.hovered = item._id;
            },
            onOut(item) {
                this.hovered = void 0;
            }
        }
    }
</script>


<style scoped>
    .root {
        display: list-item;
        table-layout: fixed;
        list-style-type: none;
        list-style-position: outside;
    }

    i.icon.fas {
        font-family: "Font Awesome 5 Free";
    }

    i.icon.fab {
        font-family: "Font Awesome 5 Brands";
    }
</style>
