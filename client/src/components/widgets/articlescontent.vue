<template>
    <widget :name="`новости (${filter.length})`" column style="align-items: stretch">
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="primary--text">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-exclamation-circle</v-icon>
                    Содержание:
                </h2>
                

                <v-btn
                    v-if="auth.group === 'admins'"
                    class="top-dial" 

                    absolute
                    right
                    dark
                    fab
                    color="accent"
                    @click="commit('SHOW_MODAL', { 'news-dialog': item })"
                >
                    <v-icon :size="18">fas fa-pen</v-icon>
                </v-btn>
            </v-layout>   
            
        </div>

        

        <v-divider slot="divider" class="mb-4"/>

        <v-card style="flex: 1" flat>
            <v-card-text>
                <tree-list :items="filter" :selected="selected" @select="selected = arguments[0], $emit('select', selected)"/>
            </v-card-text>
        </v-card>
    </widget>        
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        components: {
            'tree-list': () => import('../tree-list')
        },
        computed: {
            filter() {
                if(!this.selected) {
                    this.selected = this.raw_data.length && this.raw_data[0]._id;
                    this.$emit('select', this.selected);
                }
                
                debugger
                
                let content = this.raw_data.map(section => {
                    !section.items && (section.items = section.children.map(child => this.raw_data.find(section => section._id === child)));
                    return section
                });
                
                content = content.filter(section => !section.parent);
                return content;
            }
        },
        data() {
            return {
                entity: 'content',
                selected: void 0,
                /* items: [
                    {
                        _id: 1,
                        title: 'semantic.json',
                        description: 'Contains build settings for gulp',
                        icon: 'far fa-caret-down',
                        items: [
                            {
                                _id: 2,
                                title: 'default',
                                description: 'Default packaged theme',
                                icon: 'far fa-caret-down',
                            },
                            {
                                _id: 3,
                                title: 'my_theme',
                                description: 'Packaged themes are also available in this folder',
                                icon: 'far fa-caret-down',
                            }

                        ]
                    },
                    {
                        _id: 4,
                        title: 'semantic.json',
                        description: 'Contains build settings for gulp',
                        icon: 'far fa-caret-down',
                        items: [
                            {
                                _id: 5,
                                title: 'default',
                                description: 'Default packaged theme',
                                icon: 'far fa-caret-down',
                                items: [
                                    {
                                        _id: 6,
                                        title: 'default',
                                        description: 'Default packaged theme',
                                        icon: 'fab fa-creative-commons-share',
                                    },
                                    {
                                        _id: 7,
                                        title: 'my_theme',
                                        description: 'Packaged themes are also available in this folder',
                                        icon: 'fab fa-creative-commons-share',
                                    }

                                ]
                            },
                            {
                                _id: 8,
                                title: 'my_theme',
                                description: 'Packaged themes are also available in this folder',
                                icon: 'far fa-caret-down',
                            }

                        ]
                    }
                ] */
            }
        }
    }
</script>

<style scoped>

    .top-dial {
        margin-top: 24px;
    }

</style>