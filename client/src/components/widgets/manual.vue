<template>
    <widget :name="`новости (${filter.length})`" wrap justify-center>
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="primary--text">
                    <v-icon color="primary" medium class="mr-2 shadow">fas fa-exclamation-circle</v-icon>
                    Статьи и нструкции
                </h2>
                <v-speed-dial 
                    v-if="auth.group === 'admins'"
                    class="top-dial" 
                    absolute

                    
                    
                    right
                >
                    <v-btn
                        slot="activator"
                        dark
                        fab
                        color="accent"
                        @click="commit('SHOW_MODAL', { 'manual': { parent: section } })"
                    >
                        <v-icon>fas fa-plus</v-icon>
                        <v-icon class="second-icon" :size="12" v-show="!append" color="">far fa-file</v-icon>

                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                    <!-- <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        @click="commit('SHOW_MODAL', { 'manual': { parent: section } })"
                    >
                        <v-tooltip left>
                            <v-icon slot="activator">far fa-newspaper</v-icon>
                            <span>Добавить новость</span>
                        </v-tooltip>
                    </v-btn>
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        @click="commit('SHOW_MODAL', { 'manual': void 0 })"
                    >
                        <v-tooltip left>
                            <v-icon slot="activator">far fa-calendar-alt</v-icon>
                            <span>Добавить событие</span>
                        </v-tooltip>
                    </v-btn> -->
                </v-speed-dial>
            </v-layout>   
        </div>

        

        <v-divider slot="divider" class="mb-4"/>

        <v-flex v-if="filter.length" v-for="item in filter" :key="item._id" style="max-width: 300px">
            <sui-card style="width: 300px!important" :class="{ 'elevation-1': active !== item._id, 'elevation-10': active === item._id }" @click="clicked = item._id" @mouseover="active = item._id" @mouseout="active = false">
                <!-- <sui-image src="static/images/avatar/large/matthew.png" /> -->
                <!-- :placeholder="`https://placeimg.com/300/${200 + item._id}/nature`" -->
                <sui-embed v-if="item.video_url"
                    :active="item._id === clicked"
                    icon="fas fa-film"
                    :id="item.video_id"
                    :placeholder="item.compressed ? `${BASE_URL}/${item._id}/files/${item.compressed}` : `https://placeimg.com/150/${100 + item._id}/nature`"
                    :source="item.video_provider"
                    :iframe="{ allowFullScreen: true, allowfullscreen: true, mozallowfullscreen: true, webkitallowfullscreen: true}"
                />
                <v-card-media v-else-if="item.compressed" :height="159.75" :src="item.compressed ? `${BASE_URL}/${item._id}/files/${item.compressed}` : ''" />
                <v-card-media v-else :height="159.75" :src="`https://placeimg.com/150/${100 + item._id}/nature`" />

                <sui-card-content>
                    <sui-card-header :alt="item.title" :class="item._id === active ? 'accent--text' : 'primary--text'">{{ item.title }}</sui-card-header>
                    <sui-card-meta><small>{{ new Date(parseInt(item.created)).toLocaleString() }}</small></sui-card-meta>

                    <v-divider/>

                    <sui-card-description v-html="item.text"/>
                        <!-- {{ item.text }} -->
                </sui-card-content>
                <sui-card-content extra>
                    <div v-if="item.tags && item.tags.length" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block; max-width: 120px">
                        <v-icon class="mr-1 secondary--text" :size="12">fas fa-tags</v-icon>
                        <small>{{ item.tags.reduce((str, item, inx, arr) => str = str + item + (inx === arr.length - 1 ? '' : ' | '), '') }}</small>
                    </div>
                    <v-btn slot="right" @click.stop :to="`readmanual:${item._id}`" dark flat color="secondary" icon small class="ma-0"><v-icon small>fas fa-expand</v-icon></v-btn>
                </sui-card-content>

                <v-speed-dial class="card-dial"
                        v-if="auth.group === 'admins'"
                        absolute
                        v-model="fab[item._id]"
                        
                        :bottom="bottom"
                        :right="right"
                        :left="left"
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                        v-show="item._id === active"
                    >
                    <!-- :style="fab[item._id] ? 'background-color: rgb(142, 36, 170)' : 'background-color: rgb(142, 36, 170, 0.5)'" -->
                        <v-btn
                            slot="activator"
                            v-model="fab[item._id]"
                            
                            dark
                            fab
                            small
                            color="accent"
                            :style="!fab[item._id] && 'opacity: 0.5'"
                        >
                            <v-icon>fas fa-chevron-down</v-icon>
                            <v-icon>fas fa-chevron-up</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            dark
                            small
                            color="secondary"
                            @click="commit('SHOW_MODAL', { 'manual': item })"
                            class="btn-icon-shadow"
                        >
                            <v-tooltip left>
                                <v-icon slot="activator" :size="13" style="margin-bottom: 1px">fas fa-pen</v-icon>
                                <span>Редактировать</span>
                            </v-tooltip>
                        </v-btn>
                        <v-btn
                            icon
                            dark
                            small
                            color="error"
                            @click.native="commit('SHOW_MODAL', { 'manual': item, options: { remove: true }})"
                            class="btn-icon-shadow"
                        >
                            <v-tooltip left>
                                <v-icon  slot="activator" small>fas fa-times</v-icon>
                                <span>Удалить</span>
                            </v-tooltip>
                        </v-btn>
                    </v-speed-dial>

            </sui-card>
                
        </v-flex>
        <!-- <v-flex v-if="!filter.length">
            <sui-card class="elevation-0 not-found">
                <sui-card-content>
                    <sui-card-header>{{ `Новостей за ${new Date(date).toLocaleDateString()} не найдено` : '' }}</sui-card-header>
                </sui-card-content>
            </sui-card>
        </v-flex> -->

        <!-- <news-dialog @removed="removed" @appended="appended"/> -->
    </widget>        
</template>

<script>
    import Widget from './class_widget';
    //import newsDialog from '../modals/news-dialog';

    export default {
        props: ['section'],
        extends: Widget,
        components: {
            //newsDialog
            //news: () => import('../modals/news'), DONT DO LIKE THIS, REGISTERED MULTIPLY SAME DIALOGS AND SHOWS THEM TOGETHER, USE REGISTER_MODAL INSTEAD
        },
        created() {
            //this.commit('REGISTER_MODAL', 'news-dialog');
        },
        computed: {
            filter() {
                //debugger
                ////console.log(this.section);
                let raw_data = this.raw_data.filter(item => item.parents.includes(this.section));

                return raw_data.sort((a, b) => a.created - b.created);
            },
        },
        methods: {
            tags(item) {
                return item.tags.reduce((str, item, inx) => str = str + item, '')
            },
            onHover(id) {
                this.value[id] = true;
                this.active = id;
            },
        },
        watch: {
            'append': function(val) {
                val && this.onHover(0);
            }
        },
        data() {
            return {
                append: false,

                active: false,
                clicked: false,
                value: {},
                direction: 'bottom',
                fab: {},
                hover: true,
                top: true,
                right: true,
                bottom: false,
                left: false,
                transition: 'slide-y-reverse-transition',
            }
        }
    }
</script>

<style scoped>
    .second-icon {
        margin-bottom: 24px;
        margin-left: 24px;
    }
    .v-card, .ui.card {
        margin: auto;
    }

    .card-dial {
        margin-top: 16px;
        padding-bottom: 6px;
        /* z-index: 1; */
    }

    .top-dial {
        margin-top: 24px;
    }

    .ui.card, .ui.card>:first-child {
        border-radius: 0px!important;
    }

    .ui.card.not-found {
        text-align: center;
        width: inherit!important;
        cursor: default;
    }

    .ui.card {
        width: 200px!important;
        cursor: pointer;
    }
    
    .description {
        min-height: 100px;
        max-height: 100px;
        overflow: hidden;
    }

    .description {
        position: relative;
    }

    .description:after {
        left: 0;
        position: absolute;
        bottom: 0;  
        height: 100%;
        width: 100%;
        content: "";
        background: linear-gradient(to top,
            rgba(255,255,255, 1) 0%, 
            rgba(255,255,255, 0) 100%
        );
        pointer-events: none; 
    }

    .header {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

</style>