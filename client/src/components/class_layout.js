import Widget from './widgets/class_widget';

export default {
    extends: Widget,
    components: {
        dashboard: () => import('./dashboard')
    },
    computed: {
        layout() {
            return this.layouts[this.current_layout].layout;
        },
        components() {
            return this.layouts[this.current_layout].components;
        }
    },
    watch: {
        '$vuetify.breakpoint': function(breakpoint) {
            this.current_layout = breakpoint.name;
        }
    },
    created() {
        this.layouts = Object.keys(this.layouts).reduce((memo, key, inx, arr) => {
            let keys = key.split(',');
            keys.forEach(item => {
                memo[item] = this.layouts[key];
            });

            return memo;
        }, {})
    },
    data() {
        return {
            current_layout: this.$vuetify.breakpoint.name,
            layouts: {}
        }
    }
}
