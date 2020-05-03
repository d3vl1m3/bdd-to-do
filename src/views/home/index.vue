<template>
    <div>
        <div class="container mb-4">
            <div class="row-cols-1">
                <navigation-triggers/>
            </div>
        </div>

        <div class="container mb-4">
            <div class="row-cols-1">
                <form @submit.prevent="addItem">
                    <input id="new-task-input"
                           class="new-task-input"
                           type="text"
                           v-model="task"
                           aria-label="Your new task">
                    <button class="new-task-submit"
                            type="submit">
                        Add
                    </button>
                </form>
            </div>
        </div>

        <div v-if="getActiveTasksOnlyWithActiveCategories.length"
             class="container mb-4">
            <div class="row-cols-1">
                <eisenhower-sorted-list class="task-list"/>
            </div>
        </div>

        <div class="container mb-4">
            <div class="row-cols-1">
                <task-list class="done-list" :tasks="getAllCompleteActiveTasks"/>
            </div>
        </div>

    </div>
</template>

<script>

    import Vue from 'vue';
    import Task from '@/models/Task';
    import ActiveStatesEnum from "@/enums/ActiveStatesEnum";
    import TaskService from "@/services/TaskTemplateService";
    import NavigationTriggers from '@/components/navigation/triggers/index.vue';
    import EisenhowerSortedList from "@/components/taskLists/eisenhowerSortedList/index.vue";

    export default Vue.component('Home', {
        data: () => ({
            hide: false,
            task: '',
            ordered_tasks: []
        }),
        mixins: [
            TaskService
        ],
        components: {
            EisenhowerSortedList,
            NavigationTriggers
        },
        methods: {
            addItem() {
                if (this.task.trim() !== '') {
                    Task.insert({
                        data: [
                            {
                                title: this.task,
                                state_id: ActiveStatesEnum.ACTIVE
                            }
                        ]
                    }).then(() => {
                        // clear the input field
                        this.task = '';
                    });
                }
            }
        }
    });
</script>