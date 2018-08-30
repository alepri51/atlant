import Base from '../class_base';

export default {
    extends: Base,
    data() {
        return {
            form: {},
            options: {},
            defaults: {}
        }
    },
    methods: {
        submit() {
            //debugger
            let validated = this.options.remove || this.$refs.form.validate();

            let headers = {};
            let data = void 0;

            if(this.form.blob instanceof FormData) {
                headers = {
                    'content-type': 'multipart/form-data'
                };

                data = Object.keys(this.form).reduce((memo, key) => {
                    key !== 'blob' && memo.has(key) ? memo.set(key, this.form[key]) : memo.append(key, this.form[key]);

                    return memo;
                }, this.form.blob);
            }

            validated ? 
                this.execute({ 
                    method: this.options.remove ? 'delete' : 'post',
                    headers,
                    endpoint: `${this.entity}.save`,
                    payload: data || this.form, 
                    callback: (response) => {
                        if(!response.error) {
                            this.commit('HIDE_MODAL', { [this.entity]: void 0 });
                            this.options.remove && this.$emit('removed', this.form._id);
                            !this.form._id && this.$emit('appended', this.form._id);

                            this.commit('MUTATE_ENTITY', { entities: response.entities, entity: this.entity, id: this.form._id, deleted: this.options.remove });
                        }
                    }
                })
                :
                this.commit('SHOW_SNACKBAR', {text: 'Не корректно введены данные' });
        }
    },
    computed: {
        visible: { 
            get() {
                let { data: modal_data, options = {} } = this.state.modals[this.entity] || { data: void 0, options: void 0 };
                this.options = options;

                typeof modal_data === 'object' && (Object.keys(modal_data).length ? this.form = JSON.parse(JSON.stringify(modal_data)) : this.form = JSON.parse(JSON.stringify(this.defaults || {})));
                
                return !!modal_data;
            },
            set: () => {}
        },
    },
    watch: {
        'visible': async function(val) {
            console.log(this.entity, 'visible', val);
            this.defaults = this.auth.signed === 1 ? await this.execute({ endpoint: `${this.entity}.defaults`, cache: false }) : {};
        }
    }
}