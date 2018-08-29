import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/landing'
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    let name = to.path.slice(1);
    to.query && store.commit('SET_PATH_QUERY', to.query);

    store.commit('INIT', name);
    !store.state.token && await store.dispatch('execute', { cache: false, endpoint: 'signup.silent'});

    store.commit('REGISTER_VIEW', name);
    store.commit('LOCATION', name);

    next();
});

export default router;
