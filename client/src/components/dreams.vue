<template>
  <!-- <div > -->
    <v-card height="100%" width="100%">
        
        <v-layout column align-content-space-between>
            <v-card-title>
                <v-btn
                    absolute
                    right

                    fab
                    dark

                    small
                    color="green"
                    @click="false"
                >
                    <v-icon>fas fa-plus</v-icon>
                </v-btn>

                <!-- <v-speed-dial
                    absolute

                    v-model="fab"
                    :top="false"
                    :bottom="bottom"
                    :right="right"
                    :left="left"
                    :direction="direction"
                    :open-on-hover="hover"
                    :transition="transition"
                >
                    <v-btn
                        slot="activator"
                        v-model="fab"
                        :style="active || fab ? 'background-color: ' + $colors.green.darken2 : 'background-color: rgb(96, 125, 139, 0.5)'"
                        dark
                        fab
                        small
                    >
                        <v-icon>fas fa-cogs</v-icon>
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>

                    <v-btn
                        fab
                        dark
                        flat
                        small
                        color="green"
                        @click="false"
                    >
                        <v-icon>fas fa-plus</v-icon>
                    </v-btn>

                </v-speed-dial> -->
                <h2><v-icon color="blue" class="mr-2">fab fa-gripfire</v-icon>Мои мечты:</h2>
            </v-card-title>
            <v-card-text>
                <!-- <v-btn absolute top right fab small color="secondary"><v-icon>fas fa-plus</v-icon></v-btn> -->
                

                <dx-linear-gauge
                    v-for="dream in entities.dream"
                    :key="dream._id"
                    v-bind="gauge"
                    :value="dream.progress * 100 / dream.value" 
                    :subvalues="[dream.progress * 100 / dream.value]"
                    :title="title(dream.name, dream.value)"
                >
                    <v-speed-dial
                        absolute

                        v-model="fab"
                        :top="false"
                        :bottom="bottom"
                        :right="right"
                        :left="left"
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                        v-show="value"
                    >
                        <v-btn
                            slot="activator"
                            v-model="fab"
                            :style="active || fab ? 'background-color: rgb(48, 63, 159)' : 'background-color: rgb(96, 125, 139, 0.5)'"
                            dark
                            fab
                            small
                            @mouseover="active = true" @mouseout="active = false"
                        >
                            <v-icon>fas fa-cogs</v-icon>
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>

                    </v-speed-dial>  
                </dx-linear-gauge>
                
            </v-card-text>
        </v-layout>
        <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">мечты</div>
    </v-card>
      
  <!-- </div> -->
</template>

<script>
     import { DxLinearGauge } from 'devextreme-vue';

    export default {
        components: {
            DxLinearGauge
        },
        data() {

            return {
                active: false,
                value: false,
                direction: 'bottom',
                fab: true,
                fling: false,
                hover: true,
                tabs: null,
                top: true,
                right: true,
                bottom: false,
                left: false,
                transition: 'slide-y-reverse-transition',
                
                gauge: {
                    size: {
                        height: 150
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
        },
        methods: {
            title(title, subtitle) {
                let title_config = {...this.gauge.title};
                title_config.text = title;
                title_config.subtitle = {...this.gauge.title.subtitle};
                title_config.subtitle.text = subtitle + '$';

                return title_config;
            }
        }
    }
</script>

<style scoped>
    .v-speed-dial {
        /* position: absolute; */
        right: 32px;
    }

    .widget {
        width: 100%;
        height: 100%;
    }

    /* .widget div:first-child {
        height: 100%;
    } */
</style>

