<template>
    <sui-list class="pa-0 pt-1">
        <sui-list-item v-for="(item, inx) in children" :key="inx">
            <sui-list-icon 
                :name="closed[item._id] ? 'far fa-caret-right' : item[itemsName] ? 'far fa-caret-down' : 'fas fa-user'"
                :size="'large'" 
                style="cursor: pointer" 
                class="shadow"
                :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 
                @mouseover="onIn(item)" 
                @mouseout="onOut(item)"
                @click="onIconClick(item)" 
            />
                

            <sui-list-content>
                <!-- <sui-list-header>{{ item.title }}</sui-list-header> -->
                <h3 class="mb-1" 
                    style="cursor: pointer" 
                    @click="$emit('select', item._id)" 
                    :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 

                    @mouseover="onIn(item)" @mouseout="onOut(item)"
                >
                    {{ item.title || item.name }}
                </h3>
                <sui-list-description>{{ item.description }}</sui-list-description>
                    <!-- <tree-list :items="item.items"/> -->

                <sui-list-list v-if="item[itemsName] && item[itemsName].length" v-show="!closed[item._id]" class="pa-0 pt-1">
                    <tree-list :items="item[itemsName]" :items-name="itemsName" :entity="entity" :selected="selected" v-on="$listeners"/>
                </sui-list-list>
                <!-- <div v-else>no items {{ item }}</div> -->
            </sui-list-content>
        </sui-list-item>
    </sui-list>

    <!-- <sui-list class="pa-0 pt-1">
        <sui-list-item v-for="(item, inx) in children" :key="inx">
            <sui-list-icon 
                :name="(item[itemsName] && item[itemsName].length) ? closed[item._id] ? 'far fa-caret-right' : 'far fa-caret-down' : 'far fa-caret-right'"
                :size="'large'" 
                style="cursor: pointer" 
                class="shadow"
                :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 
                @mouseover="onIn(item)" 
                @mouseout="onOut(item)"
                @click="$set(closed, item._id, !!!closed[item._id]), closed[item._id] && ($emit('select', item._id), $emit('expand', item._id))" 
            />

            <sui-list-content>
                <h3 class="mb-1" 
                    style="cursor: pointer" 
                    @click="$emit('select', item._id)" 
                    :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 

                    @mouseover="onIn(item)" @mouseout="onOut(item)"
                >
                    {{ item.title || item.name }}
                </h3>
                <sui-list-description>{{ item.description }}</sui-list-description>

                <sui-list-list v-if="item[itemsName] && item[itemsName].length" v-show="!closed[item._id]" class="pa-0 pt-1">
                    <tree-list :items="item[itemsName]" :items-name="itemsName" :entity="entity" :selected="selected" v-on="$listeners"/>
                </sui-list-list>
                <div v-else>no items {{ item }}</div>
            </sui-list-content>
        </sui-list-item>
    </sui-list> -->
</template>

<script>
    
    export default {
        name: 'tree-list',
        props: ['items', 'itemsName', 'entity'],
        data() {
            return {
                selected: void 0,
                hovered: void 0,
                closed: {}
            }
        },
        created() {
            /* this.items.forEach(item => {
                !item.items && (closed[item._id] = item);
            }); */
        },
        computed: {
            children() {
                //debugger
                let ddd = this.items.map(item => {
                    let child = item instanceof Object ? item : this.entity[item];
                    child = JSON.parse(JSON.stringify(child));
                    child.items = child[this.itemsName];
                    typeof this.closed[child._id] === 'undefined' && (!child.items ? this.$set(this.closed, child._id, true) : this.$set(this.closed, child._id, false));
                    

                    return child;
                });

                return ddd;
            }
        },
        methods: {
            onIconClick(item) {
                //this.closed[item._id] = !this.closed[item._id];
                this.$set(this.closed, item._id, !this.closed[item._id]);
                !this.closed[item._id] && this.$emit('expand', item._id);
            },  
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
