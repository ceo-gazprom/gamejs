<template>
    <div id="app">
        <headerComp />
        <router-view></router-view>
        <footerComp />
    </div>
</template>
<script>
import headerComp from './components/header.vue';
import footerComp from './components/footer.vue';

export default {
    components:{
        headerComp,
        footerComp
    }
}

// Создаем все необходимые coockies, если их нет
window.$cookies.isKey('locale') ? null : window.$cookies.set('locale', 'en');

</script>