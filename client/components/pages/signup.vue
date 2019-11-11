<template>
    <main style="background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);">

        <div class="form">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </p>
            <form id="app" @submit="checkForm" action="/api/signup" method="post">

                <h1>{{ $t("create_account_title") }}</h1>
                <img src="/img/nophoto.png" height="64"><br>
                <input type="file" @change="onFileChange" />
                    <div id="preview">
                        <img v-if="imageUrl" :src="imageUrl" />
                    </div>

                <label for="username">{{ $t("username") }}</label><br>
                <input type="text" name="username" id="username" v-model="username" :placeholder="$t('y_username')" ><br>
                
                <label for="password">{{ $t("password") }}</label><br>
                <input type="password" name="password" id="password" v-model="password" :placeholder="$t('y_password')"><br>
                
                <label for="repassword">{{ $t("repassword") }}</label><br>
                <input type="password" name="repassword" id="repassword" v-model="repassword" :placeholder="$t('y_password')"><br>
                
                <label for="email">{{ $t("email") }}</label><br>
                <input type="text" name="email" id="email" v-model="email" :placeholder="$t('y_email')"><br>

                <input class="button button__blue" type="submit" :value="$t('create_account')">
                {{ $t("already_account") }} <router-link to="/login">{{ $t("signin") }}</router-link>
            </form>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        return {
            errors: [],
            username: null,
            password: null,
            repassword: null,
            email: null,
            // Путь к изображению на устройстве
            imageUrl: null,
        }
    },

    methods:{
        onFileChange(e) {
            const file = e.target.files[0];
            this.imageUrl = URL.createObjectURL(file);
        },
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




  
  <p>
    <label for="name">Name<label>
    <input type="text" name="name" id="name" v-model="name">
  </p>

  <p>
    <label for="age">Age<label>
    <input type="number" name="age" id="age" v-model="age" min="0">
  </p>

  <p>
    <label for="movie">Favorite Movie<label>
    <select name="movie" id="movie" v-model="movie">
      <option>Star Wars</option>
      <option>Vanilla Sky</option>
      <option>Atomic Blonde</option>
    </select>
  </p>

  <p>
    <input type="submit" value="Submit">  
  </p>

</form>
