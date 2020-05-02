<template>
    <div>
        <h1>Sorting</h1>
        <eisenhower-sorting/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import EisenhowerSorting from "@/components/forms/eisenhowerSorting/index.vue"

    export default Vue.component('Sorting', {
        components: {
            EisenhowerSorting,
        }
    });
</script>