<template>
    <div>
        <div class="container mb-4">
            <div class="row-cols-1">
                <navigation-triggers/>
                <eisenhower-sorting/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import EisenhowerSorting from '@/components/forms/eisenhowerSorting/index.vue';
    import NavigationTriggers from '@/components/navigation/triggers/index.vue';

    export default Vue.component('Sorting', {
        components: {
            NavigationTriggers,
            EisenhowerSorting
        }
    });
</script>