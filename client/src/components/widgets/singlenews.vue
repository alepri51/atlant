<template>
    <widget v-if="item" name="новость">
        <div slot="header">
            <v-layout class="ma-2" column>
                <sui-card-meta><small>{{ new Date(parseInt(item.created)).toLocaleString() }}</small></sui-card-meta>

                <h2 class="primary--text ma-0">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-exclamation-circle</v-icon>
                    {{ item.title }}
                </h2>
                <div class="mt-2" v-if="item.tags && item.tags.length" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;">
                    <v-icon class="mr-1 secondary--text" small>fas fa-tags</v-icon>
                    {{ item.tags.reduce((str, item, inx, arr) => str = str + item + (inx === arr.length - 1 ? '' : ' | '), '') }}
                </div>

                
            </v-layout>   
            <v-btn
                v-if="auth.group === 'admins'"
                class="top-dial" 

                absolute
                right
                dark
                fab
                color="accent"
                @click="commit('SHOW_MODAL', { 'news': item })"
            >
                <v-icon>fas fa-pen</v-icon>
                <v-icon>fas fa-feather-alt</v-icon>
            </v-btn>
            
        </div>

        <v-divider slot="divider" class="mb-2"/>

        <v-card flat tile :width="'100%'">
            <sui-card style="width: 100%">
                <sui-embed v-if="item.video_url"
                    icon="fas fa-film"
                    :id="item.video_id"
                    :placeholder="item.compressed ? `${BASE_URL}/${item._id}/files/${item.compressed}` : `https://placeimg.com/500/${400 + item._id}/nature`"
                    :source="item.video_provider"
                    :iframe="{ 
                        allowFullScreen: true, 
                        allowfullscreen: true, 
                        mozallowfullscreen: true, 
                        webkitallowfullscreen: true,
                    }"
                    
                />
                <v-card-media v-else-if="item.compressed" :height="'30vh'" :src="item.compressed ? `${BASE_URL}/${item._id}/files/${item.compressed}` : ''" />
                <v-card-media v-else :height="'30vh'" :src="`https://placeimg.com/500/${500 + item._id}/nature`" />
            </sui-card>
            <v-card-text v-html="item.text" style="flex: 1;"/>
        </v-card>

        <!-- <news-dialog/> -->
    </widget>        
</template>

<script>
    import Widget from './class_widget';
    //import newsDialog from '../modals/news-dialog';

    export default {
        extends: Widget,
        components: {
            //newsDialog
            //news: () => import('../modals/news'),
        },
        created() {
            //this.commit('REGISTER_MODAL', 'news-dialog');
        },
        computed: {
            endpoint() {
                //debugger
                return `${this.component_name}${ this.component_id ? ':' + this.component_id : '' }`;
            },
            item() {
                return this.raw_data.filter(item => item._id === this.state.route.id)[0];
            }
        },
        methods: {
            /* load() {
                //debugger;
                //let endpoint = `${this.component_name}:${ this.component_id}`;
                //this.execute({ endpoint, method: 'get', cache: false });
            } */
        },
        data() {
            return {
                entity: 'news'
            }
        }
    }
</script>

<style scoped>
    .top-dial {
        margin-top: -28px;
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