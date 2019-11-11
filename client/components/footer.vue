<template>
    <footer>
        <div class="footer__inner">
            <div class="footer__links">
                <router-link to="/about">
                    {{ $t('about') }}
                </router-link>
                {{ $t('faq') }}
                {{ $t('blog') }}
                {{ $t('contact') }}
            </div>
            <div class="footer__docs"><i class="fab fa-facebook-f"></i> <i class="fab fa-twitter"></i> Directory · Terms · Privacy · Cookies</div>
            <div class="footer__locale">
                <span @click="changeLang">
                    {{ $t('language') }} <img :src="'/img/flags/' + this.locale + '.svg'" height="24" style="vertical-align: middle;">
                </span>
            </div>
            <div class="footer__copy">Copyright&copy; 2019 BBDD corp.</div>
        </div>
    </footer>
</template>
<script>
export default {
    data(){
        return {
            locale: null,
        }
    },
    
    mounted(){
        // Проверяем куки и устанавливаем актуальный язык
        this.locale = window.$cookies.get('locale');
        this.$i18n.locale = this.locale;
    },

    methods:{
        // Смена языка приложения по клику
        changeLang() {
            if (this.$i18n.locale == 'ru') {
                window.$cookies.set('locale', 'en')
                this.$i18n.locale = 'en';
            }
            else if (this.$i18n.locale == 'en'){
                window.$cookies.set('locale', 'ru')
                this.$i18n.locale = 'ru';
            }
        }
    }
}
</script>