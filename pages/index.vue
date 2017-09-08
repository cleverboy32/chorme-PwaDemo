<template>
    <div>
        <div class="title">welcome to this demo</div>
        <div class="img">
            <img src="https://lorempixel.com/400/200/" ref="img">
        </div>
        <div>
            <button @click="subscribe">订阅图片</button>
        </div>
        <div class="message">
            <p v-if="subcribe">
                ok, we will message you at every time picture change. and thanks for your subscribe,
                you like is our chase.
            </p>
            <p v-else>
                you can subscribe, then we will message you picture change. dont you want see new picture?
                its beatiful.
            </p>
        </div>
    </div>
</template>

<script>
import util from '../scripts/app.js';

export default {
    name: 'index',
    data () {
        return {
            subcribe: false
        }
    },
    mounted () {
        let img = this.$refs.img;
        util.fresh(img);
    },
    methods: {
        subscribe () {
            util.btnClick().then((data) => {
                this.subcribe = data;
            });
        }
    }
}
</script>
<style lang="less">
div {
    text-align: center;
}
.title {
    margin-top: 10px;
    font-weight: bold;
}
.img {
    margin-top: 100px;
    box-sizing: border-box;
}
img {
    height: 45%;
    width: 90%;
    max-width: 400px;
    max-height: 200px;
}
button {
    margin-top: 10px;
    width: 150px;
    height: 40px;
    background: #9cc2f4;
    border: none;
    box-shadow: 2px 4px 10px 0px #d1e3fa;
    outline: none;
}
button:active {
    box-shadow: 2px 4px 10px 0px #d1f3fa;
}
.message {
    margin-top: 30px;
    p {
        margin: 0 auto;
        width: 80%;
        text-align: justify; 
    }
}
</style>

