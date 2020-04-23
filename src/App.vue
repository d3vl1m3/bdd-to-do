<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                Welcome to app
                <button @click="hide = true"></button>
                <p v-if="!hide">Now you see me</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
           hide: false
        })
    }
</script>

<style lang="scss">
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
