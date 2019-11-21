<template>
    <main style="background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);">

        <!-- Форма регистрации -->
        <div class="form">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </p>

            <form @submit="checkForm" action="/api/account/signup" method="post">

                <!-- Заголовок формы -->
                <div class="form-header__wrap">
                    <div class="form-header__background"></div>
                    <div class="form-header__photo">
                        <img src="/img/nophoto.png">
                    </div>
                </div><!-- /form-header__wrap -->

                <h1>{{ $t("create_account_title") }}</h1>

                <div class="input__photo" style="position: relative;">
                    <input type="file" @change="onFileChange" style="opacity: 0; top: 0: right: 0; bottom: 0; left: 0; position: absolute; cursor: pointer;" />
                    <img :src="imageUrl" height="64"><br>
                </div>

                <!-- Тело формы -->
                <div class="form-body__wrap">

                    <!-- Логин -->
                    <div class="form__field" :class="{input__error: showUsernameError}">
                        <input class="form__input" name="username" id="username" v-model="username" :placeholder="$t('y_username')" type="text">
                        <div class="form__label"></div>
                    </div>
                    
                    <!-- Пароль -->
                    <div class="form__field" :class="{input__error: showPasswordError}">
                        <input class="form__input" type="password" name="password" v-model="password" :placeholder="$t('y_password')">
                        <div class="form__label"></div>
                    </div>

                    <!-- Повтор пароля -->
                    <div class="form__field" :class="{input__error: showPasswordError}">
                        <input class="form__input" type="password" name="repassword" v-model="repassword" :placeholder="$t('repassword')">
                        <div class="form__label"></div>
                    </div>

                    <!-- Email -->
                    <div class="form__field" :class="{input__error: showEmailError}">
                        <input class="form__input" type="text" id="email" name="email" v-model="email" :placeholder="$t('y_email')">
                        <div class="form__label"></div>
                    </div>
                </div><!-- /form-body__wrap -->
                
                <!-- Действия формы -->
                <div class="form-actions__wrap">
                    <div class="form-actions__buttons">
                        <input class="button button__blue" type="submit" :value="$t('create_account')">
                    </div>

                    <!-- Дорполнительная информация внизу формы -->
                    <p class="form__footer">
                        <span class="text-muted"> {{ $t("already_account") }} </span>
                        <router-link to="/signin">{{ $t("signin") }}</router-link>
                    </p>
                </div><!-- /form-actions__wrap -->
            </form>
        </div><!-- /form -->
    </main>
</template>
<script>
import Axios from 'axios';

export default {
    data() {
        return {
            // Список ошибок полей выявленных перед отправкой формы
            errors: [],
            
            // Данные полей формы регистрации
            username: null,
            password: null,
            repassword: null,
            email: null,
            
            // Путь к изображению на устройстве
            imageUrl: '/img/nophoto.png',

            // Отображение ошибок
            showUsernameError: false,
            showPasswordError: false,
            showEmailError: false,
        }
    },

    methods:{
        // Выбор фотограии профиля
        onFileChange(e) {
            const file = e.target.files[0];
            this.imageUrl = URL.createObjectURL(file);
        },

        // Метод проверяет занят ли `username`
        checkUsernameExist() {
            let response = Axios.post('api/account/usernameExist', {
                    username: this.username
            })
            .then( (response) => {
                this.showUsernameError = (response.data.result) ?  true : false;
            });
        },

        // Метод проверяет занят ли `email`
        checkEmailExist() {
            let response = Axios.post('api/account/emailExist', {
                    email: this.email
            })
            .then( (response) => {
                this.showEmailError = (response.data.result) ?  true : false;
            });
        },

        checkForm:function(e) {
            if(this.username && this.password) return true;
            this.errors = [];

            // Проверка полей
            if(!this.username) this.errors.push("Name required.");
            if(!this.password) this.errors.push("Age required.");
            if(this.password !== this.repassword) this.errors.push("Passwords do not match");

            // Проверка занят ли `username`
            this.checkUsernameExist();

            // Проверка занят ли `email`
            this.checkEmailExist();

            // Прерываем отправку данных из формы
            e.preventDefault();
        }
    }
}
</script>