<template>
    <ul>
        <TaskItem v-for="(task, i) in tasks" :key="i" :task="task"/>
    </ul>
</template>

<script>
    import Vue from "vue";
    import TaskItem from "@/components/taskLists/taskList/taskItem/index.vue"

    export default Vue.component('TaskList', {
        props: {
            tasks: {
                type: Array,
                required: true
            }
        },
        components: {
            TaskItem
        }

    });
</script>