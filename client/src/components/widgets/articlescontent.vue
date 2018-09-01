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
                    <v-icon>fas fa-pen</v-icon>
                    <v-icon>fas fa-feather-alt</v-icon>
                </v-btn>
            </v-layout>   
            
        </div>

        

        <v-divider slot="divider" class="mb-4"/>

        <v-card style="flex: 1" flat>
            <v-card-text>
                <sui-list>
                    <tree-list :items="items">
                    <!-- <sui-list-item>
                        <sui-list-icon name="fas fa-user"/>

                        <sui-list-content>
                            <sui-list-header>semantic.json</sui-list-header>
                            <sui-list-description>Contains build settings for gulp</sui-list-description>
                            <sui-list-list>
                                <sui-list-item>
                                    <sui-list-icon name="folder" />
                                    <sui-list-content>
                                        <sui-list-header>default</sui-list-header>
                                        <sui-list-description>Default packaged theme</sui-list-description>
                                    </sui-list-content>
                                </sui-list-item>
                                <sui-list-item>
                                    <sui-list-icon name="folder" />
                                    <sui-list-content>
                                        <sui-list-header>my_theme</sui-list-header>
                                        <sui-list-description>
                                            Packaged themes are also available in this folder
                                        </sui-list-description>
                                    </sui-list-content>
                                </sui-list-item>
                            </sui-list-list>
                        </sui-list-content>
                    </sui-list-item> -->
                </sui-list>
            </v-card-text>
        </v-card>
    </widget>        
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        data() {
            return {
                items: [
                    {
                        _id: 1,
                        title: 'LEVEL 0',
                        description: '0 - level'
                        icon: 'fas fa-user',
                        items: [
                            {
                                _id: 2,
                                title: 'LEVEL 1',
                                description: '1 - level'
                                icon: 'fas fa-user',
                            },
                            {
                                _id: 3,
                                title: 'LEVEL 1.1',
                                description: '1.1 - level'
                                icon: 'fas fa-user',
                            }

                        ]
                    }
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