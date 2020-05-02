<template>
    <div>
        <h1>What needs doing?</h1>

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

            <router-link v-if="getAllIncompleteActiveTasks.length"
                         :to="{name: 'task_sorting'}"
                         class="task-sort-trigger">
                Begin!
            </router-link>
        </form>
        <template>
            <eisenhower-sorted-list class="task-list" v-if="getActiveTasksOnlyWithActiveCategories.length"/>
        </template>

        <task-list class="done-list" :tasks="getAllCompleteActiveTasks"/>

    </div>
</template>

<script>

    import Task from '@/models/Task';
    import ActiveStatesEnum from "@/enums/ActiveStatesEnum";
    import TaskService from "@/services/TaskTemplateService";
    import EisenhowerSortedList from "@/components/taskLists/eisenhowerSortedList/index.vue";

    export default {
        data: () => ({
            hide: false,
            task: '',
            ordered_tasks: []
        }),
        mixins: [
            TaskService
        ],
        components: {
            EisenhowerSortedList
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
    }
</script>