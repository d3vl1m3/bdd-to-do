<template>
    <ul class="task-list">
        <li v-for="(task, i) in sortedItems"
            :key="i">
            {{ task.title }}
        </li>
    </ul>
</template>

<script>
    import Vue from "vue"
    import TaskService from "@/services/TaskService"

    export default Vue.component('EisenhowerSortedList', {
        mixins: [
            TaskService
        ],
        computed: {
            sortedItems() {
                const tasks = this.getActiveTasksWithCategories;
                tasks.forEach((a, b) => {
                    // a is less than b by some ordering criterion
                    if ( a < b) {
                        return -1;
                    }
                    // a is greater than b by the ordering criterion
                    if ( a > b) {
                        return 1;
                    }
                    // a is less than b by some ordering criterion
                    if ( a < b) {
                        return -1;
                    }
                    // a is greater than b by the ordering criterion
                    if ( a > b) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });
                return tasks;
            }
        }
    })

</script>

