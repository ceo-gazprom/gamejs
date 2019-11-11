<template>
    <main style="display: block;">
        <section>
            <img src="/tmp/1.jpg" style="height: 64px; width: 64px; margin: 20px; border-radius: 50%;">
            <img src="/tmp/2.jpg" style="height: 64px; width: 64px; margin: 20px; border-radius: 50%;">
            <img src="/tmp/3.jpg" style="height: 64px; width: 64px; margin: 20px; border-radius: 50%;">
            <img src="/tmp/2.jpg" style="height: 64px; width: 64px; margin: 20px; border-radius: 50%;">
            <img src="/tmp/3.jpg" style="height: 64px; width: 64px; margin: 20px; border-radius: 50%;">
        </section>
        <section>
            <h1 style="font-size: 20px">{{ $t('new_releases')}}</h1>
            <div class="promo" style="width:100%; height:40vh; margin-bottom: 20px; border-radius:  5px; background: linear-gradient(45deg, #26aabb, #6d43db);">
            </div>
        </section>
        <section>
            <h1 style="font-size: 20px">
                {{ $t('recommend_for_you')}}
            </h1>
            <router-link to="/game" class="nav__item">
                <img src="/tmp/1.jpg" style="height: 200px; margin: 20px; border-radius: 5px;">
            </router-link>
            <img src="/tmp/2.jpg" style="height: 200px; margin: 20px; border-radius: 5px;">
            <img src="/tmp/3.jpg" style="height: 200px; margin: 20px; border-radius: 5px;">
            <aside></aside>
            <div class="content"></div>
        </section>
    </main>
</template>
<script>
export default {

}
</script>