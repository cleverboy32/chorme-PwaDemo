<template>
    <div>
        <div class="title">welcome to this demo</div>
        <div class="img">
            <img src="https://lorempixel.com/400/200/">
        </div>
        <div>
            <button>订阅图片</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    mounted () {
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
</style>

