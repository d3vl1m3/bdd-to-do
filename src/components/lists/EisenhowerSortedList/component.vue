<template>
    <ul class="task-list">
        <li v-for="(task, i) in sortedItems"
            :key="i">
            {{ task.title }}
            <font-awesome-icon
                    icon="times-circle"
                    class="task-item-close"
                    @click="removeItem(task.id)"/>
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
                const tasks = this.getAllActiveTasks;

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
        },
        methods: {
            removeItem(id) {
                Task.update({
                    where: id,
                    data: {
                        state_id: StatesEnum.DELETED
                    }
                });
            }
        }
    })

</script>

