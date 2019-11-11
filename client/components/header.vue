<template>
    <header>
    <div class="header__logo">
        <router-link to="/"><img src="/img/logo.png"> JS games</router-link>
    </div>
    <nav>
        <router-link to="/store">
            {{ $t('store') }}
        </router-link>
        <a href="#">FAVORITE</a>
        <a href="#">SCORE</a>
        <a href="#"><i class="fas fa-search"></i></a>
    </nav>
    <div class="header__user">
        <router-link to="/signup">{{ $t('signup') }}</router-link>
        <router-link to="/signin">{{ $t('signin') }}</router-link>
            <!-- <div class="header__user-name">
                Tural
            </div>
            <div class="header__user-photo">
                <img src="/img/nophoto.png">
            </div> -->
    </div>
</header>
</template>
<script>
export default {

}
</script>