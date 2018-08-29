<template>
    <widget name="новости" wrap>
        <div slot="header">
            <v-layout class="ma-2">
                <h2 class="primary--text"><v-icon color="primary" medium class="mr-2 shadow">fas fa-exclamation-circle</v-icon>Новости платформы:</h2>
                <v-speed-dial 
                    v-if="auth.group === 'admins'"
                    class="top-dial" 
                    absolute
                    v-model="append"
                    
                    
                    right

                    direction="bottom"
                    :open-on-hover="true"

                    :transition="transition"
                >
                    <v-btn
                        slot="activator"
                        v-model="append"
                        

                        dark
                        fab
                        color="green"
                    >
                        <v-icon>fas fa-plus</v-icon>
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                    <v-btn
                        fab
                        dark
                        small
                        color="green"
                        @click="commit('SHOW_MODAL', { news: void 0 })"
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
                        color="green"
                        @click="commit('SHOW_MODAL', { news: void 0 })"
                    >
                        <v-tooltip left>
                            <v-icon slot="activator">far fa-calendar-alt</v-icon>
                            <span>Добавить событие</span>
                        </v-tooltip>
                    </v-btn>
                </v-speed-dial>
            </v-layout>   
            <div>
                

            </div>    
        </div>

        <!-- <v-card slot="header" :width="'100%'" :height="50" tile flat style="min-height: 50px">
            <v-card-title style="position: relative" class="primary--text">
                <h2><v-icon color="primary" medium class="mr-2 shadow">fas fa-exclamation-circle</v-icon>Новости платформы:</h2>

                <v-speed-dial 
                    v-if="auth.group === 'admins'"
                    class="top-dial" 
                    absolute
                    v-model="append"
                    
                    bottom
                    right

                    direction="bottom"
                    :open-on-hover="true"

                    :transition="transition"
                >
                    <v-btn
                        slot="activator"
                        v-model="append"
                        

                        dark
                        fab
                        color="green"
                    >
                        <v-icon>fas fa-plus</v-icon>
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                    <v-btn
                        fab
                        dark
                        small
                        color="green"
                        @click="commit('SHOW_MODAL', { news: void 0 })"
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
                        color="green"
                        @click="commit('SHOW_MODAL', { news: void 0 })"
                    >
                        <v-tooltip left>
                            <v-icon slot="activator">far fa-calendar-alt</v-icon>
                            <span>Добавить событие</span>
                        </v-tooltip>
                    </v-btn>
                </v-speed-dial>

            </v-card-title>
        </v-card> -->

        <v-divider slot="divider" class="mb-4"/>

        <v-flex v-for="n in 114" :key="n">
            <sui-card :class="{ 'elevation-1': active !== n, 'elevation-10': active === n }" @mouseover="active = n" @mouseout="active = -1">
                <!-- <sui-image src="static/images/avatar/large/matthew.png" /> -->
                <sui-embed
                    icon="fas fa-eye embed-icon"
                    id="90Omh7_I8vI"
                    :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                    source="youtube"
                    :iframe="{allowFullScreen: true }"
                />
                <sui-card-content>
                    <sui-card-header>Matt Giampietro</sui-card-header>
                    <sui-card-meta>Friends</sui-card-meta>
                    <sui-card-description>
                        Matthew is an interior designer living in New York.
                        Matthew is an interior designer living in New York.
                        Matthew is an interior designer living in New York.
                        Matthew is an interior designer living in New York.
                        Matthew is an interior designer living in New York.
                        Matthew is an interior designer living in New York.
                    </sui-card-description>
                </sui-card-content>
                <sui-card-content extra>
                     
                    <v-btn dark flat color="secondary" icon small class="ma-0"><v-icon small>fas fa-user</v-icon></v-btn>
                    <span slot="right">Joined in 2013</span>
                </sui-card-content>
            </sui-card>
            <!-- <v-card color="blue-grey darken-2" class="white--text" :width="200" hover>
                <sui-embed
                    icon="fas fa-eye embed-icon"
                    id="90Omh7_I8vI"
                    :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                    source="youtube"
                    :iframe="{allowFullScreen: true }"
                />
                
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card> -->
        </v-flex>
        <!-- <news @removed="removed" @appended="appended"/> -->
    </widget>        
</template>

<script>
    import Widget from './class_widget';

    export default {
        props: ['date'],
        extends: Widget,
        components: {
            //news: () => import('../modals/signin'),
        },
        computed: {
            filter() {
                let raw_data = this.raw_data;
                this.date ? raw_data = this.raw_data.filter((item) => new Date(item.date).toDateString() === new Date(this.date).toDateString()) : raw_data = this.raw_data

                return raw_data;
            },
        },
        methods: {
            appended(_id) {
                debugger;
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
    .card-dial {
        margin-top: 16px;
        padding-bottom: 6px;
        z-index: 1;
    }

    .top-dial {
        margin-top: 24px;
    }

    .ui.card, .ui.card>:first-child {
        border-radius: 0px!important;
    }

    .ui.card {
        width: 200px!important;
        cursor: pointer;
    }
    
    .description {
        max-height: 150px;
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

</style>