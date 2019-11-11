<template>
    <div>
        <main>
            <div class="game">
                <span v-html="HTMLcontent"></span>

                <div><h1>{{ this.gameData.name }}</h1></div>
                <div class="game__icon">
                    <img src="/tmp/cover.png">
                </div>
                <div>
                    {{ this.gameData.description }}
                </div>
                <div>
                    <button class="button button__blue">
                        <i class="fas fa-bookmark"></i> Add
                    </button>
                    <button class="button button__green" @click="playGame">
                        <i class="fas fa-play"></i> Play now
                    </button>
                    <button class="button button__pink">
                        <i class="fas fa-donate"></i> Donate 0,15 ETH
                    </button>
                    <button class="button button__gold">
                        <i class="fas fa-shopping-cart"></i> Buy 1,5 ETH
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import Axios from "axios";

export default {
    data(){
        return {
            HTMLcontent: null,
            gameData: null,
        }
    },
    methods: {
        playGame(){
              	this.HTMLcontent = `
                <iframe class="game-frame" src="${this.gameData.url}"></iframe>
		`;
        }
    },
    mounted() {
        Axios
            .get ('/api/game/data/' + this.$route.params.id)
            .then (response => (this.gameData = response.data[0]));
    }
}
</script>