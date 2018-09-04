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
                <!-- <tree-list :items="filter" :selected="selected" @select="selected = arguments[0], $emit('select', selected)"/> -->
                <tree-list opened-icon="far fa-folder-open" closed-icon="far fa-folder" empty-icon="far fa-copy" :items="filter" items-name="children" :entity="entities.content" :selected="selected" @select="selected = arguments[0], $emit('select', selected)"/>
            </v-card-text>
        </v-card>
    </widget>        
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        components: {
            'tree-list': () => import('../elements/tree-list')
        },
        computed: {
            filter() {
                if(!this.selected) {
                    this.selected = this.raw_data.length && this.raw_data[0]._id;
                    this.$emit('select', this.selected);
                }
                
                //debugger
                
                /* let content = this.raw_data.map(section => {
                    !section.items && (section.items = (section.children && section.children.map(child => this.raw_data.find(section => section._id === child))) || [] );
                    return section
                }); */
                
                let content = this.raw_data.filter(section => !section.parent);
                return content;
            }
        },
        data() {
            return {
                entity: 'content',
                selected: void 0,
            }
        }
    }
</script>

<style scoped>

    .top-dial {
        margin-top: 24px;
    }

</style>