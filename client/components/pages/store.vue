<template>
    <main>
        <aside>
            <b>Genres:</b><br>
            Action<br>
            Racing<br>
            Gambling<br>
        </aside>
        <div class="content" style="display: flex; flex-wrap: wrap; align-content: space-between; justify-content: space-between;">
            <div class="card" v-for="(game, index) in gameList" :key="index">
                <div class="card__wrap">
                    <div class="card__cover">
                        <div class="card__title">
                            {{ game.name }}
                        </div>
                        <img src="/tmp/2.jpg">
                    </div>
                    <div class="card__content">
                         {{ game.description }}
                    </div>
                    <router-link :to="{ name: 'game', params: { id: game.id }}" > {{ game.id }}</router-link>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import Axios from "axios";
export default {
    data(){
        return {
            gameList: null
        }
    },
    mounted(){
    Axios
      .get('/api/game/all')
      .then(response => (this.gameList = response.data));
    }
}
</script>