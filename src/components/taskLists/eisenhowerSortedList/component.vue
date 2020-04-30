<template>
    <task-list :tasks="sortedItems"/>
</template>

<script>
    import Vue from "vue";
    import TaskTemplateService from "@/services/TaskTemplateService";
    import taskList from "@/components/taskLists/taskList/component.vue"

    export default Vue.component('EisenhowerSortedList', {
        components: {
            taskList
        },
        mixins: [
            TaskTemplateService
        ],
        computed: {
            sortedItems() {
                const tasks = this.getAllIncompleteActiveTasks;

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

