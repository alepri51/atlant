<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <v-icon class="mr-1 primary--text shadow">fas fa-donate</v-icon>
                <span class="headline primary--text">Клубный взнос</span>
            </v-card-title>
            <v-card-text>
                <v-card-text v-if="visible">
                    Для оплаты клубного взноса в течении 15 минут переведите сумму в размере <b class="accent--text">{{ form.amount }} BTC</b> 
                    эквивалентную <b class="accent--text">${{ form.cost }}</b>. по курсу <b class="accent--text">${{ form.rate }}</b> 
                    за <b class="accent--text">1 BTC</b>.
                    на кошелек с адресом: <b class="accent--text">{{ form.address }}</b>.
                    В случае если Вы не успеете сделать перевод в течении 15 минут, данная операция будет отменена автоматически.
                </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="unimportant" flat @click.native="cancel">Отменить</v-btn>
                <v-btn dark color="secondary" @click.native="submit">ХОРОШО, ОЖИДАЙТЕ</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    import Modal from './class_modal';
    
    export default {
        extends: Modal,
        data: () => {
            return {
                //entity: 'payment'
            }
        },
        methods: {
            cancel() {
                debugger
                this.execute({ 
                    method: 'post', 
                    endpoint: 'donate.cancel',
                    payload: this.form,
                    callback: () => {
                        
                        this.commit('HIDE_MODAL', { [this.entity]: void 0 });
                        
                        //this.$router.replace('landing');
                    }    
                });
            }
            /* submit() {
                this.execute({ 
                    method: 'post', 
                    endpoint: 'donate.submit',
                    callback: () => {
                        
                        this.commit('HIDE_MODAL', { [this.entity]: void 0 });
                        
                        //this.$router.replace('landing');
                    }    
                });
            } */
        }
    }    
</script>