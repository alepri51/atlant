<template>
    <v-card width="100%">
        <v-card-title style="position: relative">
            <h2><v-icon color="primary" class="mr-2">fas fa-user-circle</v-icon>Мои мечты: {{inc}}</h2>
            <v-btn
                absolute
                right
                fab
                dark
                top
                color="green"
                @click="inc += 1"
            >
                <v-icon>fas fa-plus</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider/>
        <!-- <v-card-text style="overflow: auto; position: relative" id="scroll-target"> -->
            <!-- <dx-scroll-view > -->
        <v-card-text style="overflow: auto; position: relative" id="scrollable">
            <v-card @mouseover="onHover(dream._id)" @mouseout="value[dream._id] = false" class="mb-2" flat hover v-scroll:#scrollable="onScroll"
                v-for="dream in entities.dream"
                :key="dream._id"
            >
                <dx-linear-gauge 
                    v-bind="gauge"
                    :value="dream.progress * 100 / dream.value" 
                    :subvalues="[dream.progress * 100 / dream.value]"
                    :title="chart_title(dream.name, dream.value)"
                >
                    <v-speed-dial 
                        absolute
                        v-model="fab[dream._id]"
                        
                        :bottom="bottom"
                        :right="right"
                        :left="left"
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                        v-show="dream._id === active"
                    >
                        <v-btn
                            slot="activator"
                            v-model="fab[dream._id]"
                            :style="fab[dream._id] ? 'background-color: rgb(48, 63, 159)' : 'background-color: rgb(96, 125, 139, 0.5)'"
                            dark
                            fab
                            small
                            
                        >
                            <v-icon>fas fa-chevron-down</v-icon>
                            <v-icon>fas fa-chevron-up</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            dark
                            small
                            color="green darken-2"
                            @click="false"
                        >
                            <v-icon>fas fa-pen</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            dark
                            small
                            color="red darken-2"
                            @click="false"
                        >
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-speed-dial>
                </dx-linear-gauge>
            </v-card>
        </v-card-text>
            <!-- </dx-scroll-view> -->
    </v-card>
         
</template>

<style scoped>
    .v-speed-dial {
        margin-top: 16px;
        /* margin-right: 16px; */
    }

    .v-card {
        display: flex;
        flex-direction: column;
    }

    .content {
        width: 100%;
        flex: 1 1 auto;
        overflow: auto;
    }

    /* .widget div:first-child {
        height: 100%;
    } */
</style>

<script>
     import { DxLinearGauge, DxScrollView } from 'devextreme-vue';

    export default {
        components: {
            DxLinearGauge,
            DxScrollView
        },
        created() {
            debugger;
        },
        mounted() {
            debugger;
        },
        activated() {
            var container = this.$el.querySelector("#scrollable");
            container.scrollTop = this.inc;
        },
        methods: {
            onScroll(e) {
                this.inc = e.target.scrollTop;
                //console.log('SCROLL', e.target.scrollTop);
            },
            onHover(id) {
                //debugger;
                this.value[id] = true;
                this.active = id;
                //console.log(JSON.stringify(this.value, null, '\t'));
            },
            chart_title(title, subtitle) {
                let title_config = {...this.gauge.title};
                title_config.text = title;
                title_config.subtitle = {...this.gauge.title.subtitle};
                title_config.subtitle.text = subtitle + '$';

                return title_config;
            }
        },
        data() {

            return {
                inc: 0,

                active: false,
                value: {},
                direction: 'bottom',
                fab: {},
                hover: true,
                tabs: null,
                top: true,
                right: true,
                bottom: false,
                left: false,
                transition: 'slide-y-reverse-transition',
                
                gauge: {
                    size: {
                        height: 170
                    },
                    title: {
                        font: {
                            family: 'Roboto Condensed'
                        },
                        horizontalAlignment: 'left',
                        //verticalAlignment: 'bottom',
                        margin: {
                            left: 55
                        },
                        text: 'Купить квартиру',
                        subtitle: {
                            font: {
                                family: 'Roboto Condensed'
                            },
                            text: '1000$'
                        }
                    },
                    scale: {
                        startValue: 0,
                        endValue: 100,
                        tickInterval: 10,
                        minorTickInterval: 5,
                        minorTick: {
                            visible: true
                        },
                        orientation: 'inside',
                        label: {
                            useRangeColors: true,
                            format: {
                                type: 'decimal',
                                precision: 0
                            },
                            customizeText: function (arg) {
                                return (arg.value === arg.min || arg.value === arg.max) ? arg.valueText + '%' : arg.valueText;
                            }
                        }
                    },
                    rangeContainer: {
                        //offset: 10,
                        ranges: [
                            { startValue: 0, endValue: 20, color: this.$colors.red.darken2 },
                            { startValue: 20, endValue: 70, color: this.$colors.yellow.darken2 },
                            { startValue: 70, endValue: 100, color: this.$colors.green.darken2 }
                        ]
                    },
                    value: 70,
                    subvalues: [70, 50],
                    valueIndicator: {
                        offset: 10,
                        palette: 'Material',
                        color: this.$colors.green.darken2,
                    },
                    subvalueIndicator: {
                        offset: -25,
                        type: 'textCloud',
                        text: {
                            font: {
                                family: 'Roboto Condensed'
                            },
                            format: {
                                precision: 0
                                
                            },
                            customizeText: (obj) => obj.valueText + ' %'
                        },
                        palette: 'Material'
                    }
                }
            }
        }
    }
</script>



