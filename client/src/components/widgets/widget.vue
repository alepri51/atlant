<template>
    <v-card class="widget" fill-height tile>
        <v-container fluid grid-list-lg fill-height>
            <v-layout column>
                <slot name="header"/>
    
                <slot name="divider">
                    <!-- <v-divider/> -->
                </slot>
    
                <v-layout class="content" v-bind="$attrs" id="scroll" @scroll="onScroll">
                    <slot/>
                </v-layout>

                <slot name="footer"/>
                
            </v-layout>
        </v-container>
        <div style="position: absolute; bottom: 2px; right: 16px; font-size: 10px" class="grey--text">{{name}}</div>
    </v-card>
</template>

<script>
    export default {
        props: ['name'],
        data: () => ({
            scroll: 0
        }),
        activated() {
            let element = this.$el.querySelector('#scroll');
            element.scrollTop = this.scroll;
        },
        methods: {
            onScroll(e) {
                this.scroll = e.target.scrollTop;
            }
        }
    }
</script>

<style scoped>
    .widget {
        width: 100%;
        height: 100%;
    }

    .container {
        padding: 16px;
    }

    .content {
        overflow: auto;
        margin: 0px!important;
    }
</style>

