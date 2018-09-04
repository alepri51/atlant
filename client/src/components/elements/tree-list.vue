<template>
    <sui-list class="pa-0 pt-1">
        <sui-list-item v-for="(item, inx) in children" :key="inx">
            <sui-list-icon 
                :name="empty(item) ? emptyIcon : closed[item._id] ? closedIcon : openedIcon"
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
                    @click="onClick(item)"
                    :class="item._id === hovered ? 'accent--text': item._id === selected ? 'accent--text' : 'primary--text'" 

                    @mouseover="onIn(item)" @mouseout="onOut(item)"
                >
                    {{ item.title || item.name }}
                </h3>
                <sui-list-description>{{ item.description }}</sui-list-description>
                    <!-- <tree-list :items="item.items"/> -->

                <sui-list-list v-if="item[itemsName] && item[itemsName].length" v-show="!closed[item._id]" class="pa-0 pt-1">
                    <tree-list :description="description" :dynamic="dynamic" :opened-icon="openedIcon" :closed-icon="closedIcon" :empty-icon="emptyIcon" :items="item[itemsName]" :items-name="itemsName" :entity="entity" :selected="selected" v-on="$listeners"/>
                </sui-list-list>
                <!-- <div v-else>no items {{ item }}</div> -->
            </sui-list-content>
        </sui-list-item>
    </sui-list>

    
</template>

<script>
    
    export default {
        name: 'tree-list',
        //props: ['items', 'itemsName', 'entity', 'emptyIcon', 'selected'],
        props: {
            items: {
                type: Array,
                default: []
            },
            itemsName: {
                type: String
            },
            entity: {
                type: Object
            },
            emptyIcon: {
                type: String,
                default: 'far fa-circle'
            },
            openedIcon: {
                type: String,
                default: 'fas fa-caret-down'
            },
            closedIcon: {
                type: String,
                default: 'fas fa-caret-right'
            },
            selected: {
                type: Number
            },
            dynamic: {
                type: Boolean,
                default: false
            },
            description: {
                type: Function
            }
        },
        data() {
            return {
                hovered: void 0,
                closed: {},
                changed: false
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
                this.changed = false;
                this.$nextTick();
                this.changed = true;

                return this.items.map(item => {
                    let child = item instanceof Object ? item : this.entity[item];
                    child = JSON.parse(JSON.stringify(child));
                    child.items = child[this.itemsName];
                    this.description && (child.description = this.description(child));

                    typeof this.closed[child._id] === 'undefined' && (!child.items ? this.$set(this.closed, child._id, true) : this.$set(this.closed, child._id, false));
                    
                    //child._id === 155 && console.log(child.name, child._id, this.empty[child._id], this.entity[item]);

                    return child;
                });
            }
        },
        methods: {
            empty(item) {
                //debugger
                return this.dynamic ? !this.closed[item._id] && !item[this.itemsName] : !!!item[this.itemsName];
            },
            onIconClick(item) {
                //this.closed[item._id] = !this.closed[item._id];
                !this.empty(item) && this.$set(this.closed, item._id, !this.closed[item._id]);

                !this.closed[item._id] && this.$emit('expand', item._id);
                this.closed[item._id] && this.$emit('select', item._id);
            },  
            onClick(item) {
                this.$emit('select', item._id);
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
