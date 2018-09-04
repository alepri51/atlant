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
                    @click="commit('SHOW_MODAL', { 'xxx': void 0 })"
                >
                    <v-icon :size="18">fas fa-pen</v-icon>
                </v-btn>
            </v-layout>   
            
        </div>

        

        <v-divider slot="divider" class="mb-4"/>

        <v-card style="flex: 1" flat>
            <v-card-text>
                <tree-list :items="filter" items-name="referals" :entity="entities.member" @select="onSelect" @expand="onExpand"/>
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
            endpoint() {
                //debugger
                return `${this.component_name}${ this.component_id ? ':' + this.component_id : '' }`;
            },
            filter() {
                /* if(!this.selected) {
                    this.selected = this.raw_data.length && this.raw_data.find(item => item._id === this.auth.member)._id;
                    //this.$emit('select', this.selected);
                } */
                
                //debugger
                
                /* let content = this.raw_data.map(member => {
                    //!member.items && member.referals && (member.items = member.referals.map(child => this.raw_data.find(member => member._id === child)));
                    !member.title && (member.title = member.name + '(' + member.ref + ')');
                    return member
                }); */
                
                let content = this.raw_data.filter(item => item._id === this.auth.member);// content.filter(member => member._id === this.auth.member);
                return content;
            }
        },
        methods: {
            onSelect(selected) {
                this.$emit('select', selected);
            },
            onExpand(selected) {
                this.execute({ endpoint: `structure:${selected}.expand` });
                this.$emit('expand', selected);
            }
        },
        data() {
            return {
                entity: 'member',
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