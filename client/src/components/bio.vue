<template>
  <div class="widget">
      <v-card>
            <v-card-text>
                <v-layout>
                    <v-flex>
                        <h2><v-icon small color="primary" class="mr-2 mb-1">fas fa-user-circle</v-icon>{{auth.name}}</h2>
                        <div class="mt-2"><v-icon small color="secondary" class="mr-1">fas fa-at</v-icon>{{auth.email || 'e-mail'}}</div>
                    </v-flex>
                    <v-flex>
                        <h2><v-icon small color="primary" class="mr-2 mb-1">fas fa-dollar-sign</v-icon>баланс:</h2>
                        <v-layout wrap>
                            <v-flex class="" v-for="(sum, key) in balance" :key="key">
                                <v-icon small class="mr-1" color="green darken-2">fas fa-money-bill-alt</v-icon>
                                {{sum}} {{key}}
                            </v-flex>
                        </v-layout>
                        <!-- <div><v-icon small class="mr-1" color="green darken-2">far fa-money-bill-alt</v-icon>{{balance.bonus}} BONUS</div> -->
                    </v-flex>
                </v-layout>
            </v-card-text>
      </v-card>
      <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">bio</div>
  </div>
</template>

<script>
    export default {
        computed: {
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

