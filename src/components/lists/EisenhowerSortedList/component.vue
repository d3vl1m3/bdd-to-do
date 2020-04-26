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
    import TaskTemplateService from "@/services/TaskTemplateService"
    import Task from "@/models/Task";
    import StatesEnum from "@/enums/StatesEnum";

    export default Vue.component('EisenhowerSortedList', {
        mixins: [
            TaskTemplateService
        ],
        computed: {
            sortedItems() {
                const tasks = Task.query()
                    .where('state_id', StatesEnum.ACTIVE)
                    .withAllRecursive(2)
                    .get();

                tasks.sort((a,b) => {

                    if (
                        a.categories.length
                        && b.categories.length
                    ) {
                        if ( a.categories[0].order < b.categories[0].order ) {
                            return 1;
                        }
                        if ( a.categories[0].order > b.categories[0].order ) {
                            return -1;
                        }
                        if ( a.categories[1].order < b.categories[1].order ) {
                            return 1;
                        }
                        if ( a.categories[1].order > b.categories[1].order ) {
                            return -1;
                        }
                    }

                    return 0;
                });

                return tasks;
            }
        }
    })

</script>

