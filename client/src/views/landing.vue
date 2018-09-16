<template>
    <iframe src="http://s461722.lpmotortest.com/" style="width: 100%; height: 100%; margin: -2px;"></iframe>
    <!-- <div>
        ЗАМЕНИ МЕНЯ
    </div> -->
</template>

<script>
    import Layout from '../components/class_layout';

    export default {
        extends: Layout,
        components: {
            greeting: () => import('../components/greeting'),
            painpoint: () => import('../components/painpoint'),
        }
    }
</script>

<style scoped>

</style>
