<template>
    <div class="container mb-4">
        <div class="row-cols-1">
            <router-link :to="{name: 'home'}"
                         class="home-link btn btn-primary">
                Home
            </router-link>
            <router-link :to="{name: 'task_sorting'}"
                         class="sorting-link btn btn-primary">
                Begin sorting
            </router-link>

            <router-link :to="{name: 'deleted_tasks'}"
                         class="deleted-link btn btn-secondary">
                Deleted tasks
            </router-link>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import TaskService from "@/services/TaskTemplateService";

    export default Vue.component('NavigationTriggers', {
        mixins: [
            TaskService
        ],
    });
</script>