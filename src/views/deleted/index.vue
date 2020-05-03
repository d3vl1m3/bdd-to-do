<template>
    <div>
        <div class="container mb-4">
            <div class="row-cols-1">
                <navigation-triggers/>
            </div>
        </div>
        <task-list class="deleted-tasks" :tasks="getAllArchivedTasks"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import NavigationTriggers from '@/components/navigation/triggers/index.vue';
    import TaskService from "@/services/TaskTemplateService";

    export default Vue.component('Deleted', {
        data: () => ({
            hide: false,
            task: '',
            ordered_tasks: []
        }),
        components: {
            NavigationTriggers
        },
        mixins: [
            TaskService
        ],
    });
</script>