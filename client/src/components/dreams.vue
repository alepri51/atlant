<template>
  <div class="widget">
      <v-card>
            <v-card-text>
                <!-- <v-btn @click="$emit('dreams-update')"></v-btn> -->
                <h2><v-icon color="blue" class="mr-2">fab fa-gripfire</v-icon>Мои мечты:</h2>
                <dx-linear-gauge
                    v-for="dream in entities.dream"
                    :key="dream._id"
                    v-bind="gauge"
                    :value="dream.progress * 100 / dream.value" 
                    :subvalues="[dream.progress * 100 / dream.value]"
                    :title="title(dream.name, dream.value)"
                />
            </v-card-text>
      </v-card>
      <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">мечты</div>
  </div>
</template>

<script>
    /* $("#c5").dxLinearGauge($.extend(true, {}, options, {
        value: 70,
        subvalues: [70],
        valueIndicator: {
            offset: 10,
   			palette: 'Material',
            color: '#734F96',
        },
        subvalueIndicator: {
            offset: -15,
            type: 'textCloud',
            text: {
                format: {
                    precision: 0
                    
                },
                customizeText: (obj) => obj.valueText + ' %'
            },
   			palette: 'Material'
        },
    })); */

    import { DxLinearGauge } from 'devextreme-vue';

    export default {
        components: {
            DxLinearGauge
        },
        data() {

            return {
                gauge: {
                    size: {
                        height: 200
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
    .widget {
        width: 100%;
    }

    .widget div:first-child {
        height: 100%;
    }
</style>

