<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                <h1>{{ $route.meta.title }}</h1>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.component('App', {});
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
</style>
