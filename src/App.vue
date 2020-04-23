<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </div>
        <div class="container">
            <div class="row-cols-1">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
