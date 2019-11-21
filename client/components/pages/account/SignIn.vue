<template>
    <main style="background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);">

        <!-- Форма авторизации -->
        <div class="form">
            <form @submit="checkForm" action="/api/account/auth" method="post">

                <!-- Заголовок формы -->
                <div class="form-header__wrap">
                    <div class="form-header__background"></div>
                    <div class="form-header__photo">
                        <img src="/tmp/user_photo.jpg">
                    </div>
                </div><!-- /form-header__wrap -->

                <!-- Тело формы -->
                <div class="form-body__wrap">
                    <div class="form__field">
                        <input class="form__input" name="username" v-model="username" :placeholder="$t('username')" type="text">
                        <div class="form__label"></div>
                    </div>
                    <div class="form__field">
                        <input class="form__input" type="password" name="password" id="password" v-model="password" :placeholder="$t('password')">
                        <div class="form__label"></div>
                    </div>
                    <div class="" style="text-align: right;">
                        <a href="#">Forgot passwoprd</a>
                    </div>
                    
                </div><!-- /form-body__wrap -->

                <!-- Действия формы -->
                <div class="form-actions__wrap">
                    <div class="form-actions__buttons">
                        <input class="button button__blue" type="submit" :value="$t('create_account')">
                    </div>

                    <!-- Дорполнительная информация внизу формы -->
                    <p class="form__footer">
                        <br>
                        or sign upusing<br><br>
                        <img src="/img/social/facebook.png" height="64">
                        <img src="/img/social/vkontakte.png" height="64">
                        <img src="/img/social/twitter.png" height="64">
                        <img src="/img/social/gplus.png" height="64"><br><br>
                        <span class="text-muted"> {{ $t("already_account") }} </span>
                        <router-link to="/signup">{{ $t("signup") }}</router-link>
                    </p>
                </div><!-- /form-actions__wrap -->
            </form>
        </div><!-- /form -->
    </main>
</template>
<script>
export default {
    data() {
        return {
            errors: [],
            username: null,
            password: null,
        }
    },

    methods:{
        checkForm:function(e) {
            if(this.username && this.password) return true;
            this.errors = [];
            if(!this.username) this.errors.push("Name required.");
            if(!this.password) this.errors.push("Age required.");
            e.preventDefault();
        }
    }
}
</script>
