<template>
    <widget v-if="item" name="новость" column>
        <div slot="header">
            <v-layout class="ma-2" column>
                <sui-card-meta><small>{{ new Date(parseInt(item.created)).toLocaleString() }}</small></sui-card-meta>

                <sui-card style="width: 30vw; align-self: center">
                    <sui-embed v-if="item.video_url"
                        icon="fas fa-film"
                        :id="item.video_id"
                        :placeholder="item.compressed ? `https://localhost:8000/${item._id}/files/${item.compressed}` : ''"
                        :source="item.video_provider"
                        :iframe="{ 
                            allowFullScreen: true, 
                            allowfullscreen: true, 
                            mozallowfullscreen: true, 
                            webkitallowfullscreen: true,
                        }"
                        
                    />
                    <v-card-media v-else-if="item.compressed" :height="'30vh'" :src="item.compressed ? `https://localhost:8000/${item._id}/files/${item.compressed}` : ''" />
                    <v-card-media v-else :height="'30vh'" :src="`https://placeimg.com/500/${500 + item._id}/nature`" />
                </sui-card>

                <h2 class="primary--text">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-exclamation-circle</v-icon>
                    {{ item.title }}
                </h2>
            </v-layout>   
        </div>

        <v-divider slot="divider"/>

        <v-card style="display: flex; flex-direction: column; flex: 1;" flat tile>
            <v-card-text v-html="item.text" style="flex: 1;"/>
        </v-card>


        <v-card slot="footer" flat tile>
            <v-divider/>
            <v-card-actions >
                
                <div v-if="item.tags && item.tags.length" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;">
                    <v-icon class="mr-1 secondary--text" small>fas fa-tags</v-icon>
                    {{ item.tags.reduce((str, item, inx, arr) => str = str + item + (inx === arr.length - 1 ? '' : ' | '), '') }}
                </div>
                <v-spacer/>
                <v-btn
                    fab
                    dark
                    small
                    color="accent"
                    @click="commit('SHOW_MODAL', { news: item })"
                >
                    <v-tooltip left>
                        <v-icon slot="activator">fas fa-pen</v-icon>
                        <span>Редактировать</span>
                    </v-tooltip>
                </v-btn>
            </v-card-actions>
        </v-card>

    </widget>        
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        components: {
            news: () => import('../modals/news'),
        },
        computed: {
            item() {
                return this.raw_data.filter(item => item._id === this.state.route.id)[0];
            }
        },
        methods: {
            load() {
                debugger;
                let endpoint = `${this.component_name}:${ this.component_id}`;
                this.execute({ endpoint, method: 'get', cache: false });
            }
        },
        data() {
            return {
                //entity: 'news'
            }
        }
    }
</script>

<style scoped>
    .v-card, .ui.card {
        /* margin: auto; */
    }

    .ui.card, .ui.card>:first-child {
        border-radius: 0px!important;
    }

    .header {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

</style>