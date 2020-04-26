<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                <h1>What needs doing?</h1>
                <form @submit.prevent="addItem" v-if="!sorting">
                    <input id="new-task-input"
                           class="new-task-input"
                           type="text"
                           v-model="task"
                           aria-label="Your new task">
                    <button class="new-task-submit"
                            type="submit">
                        Add
                    </button>

                    <button class="task-sort-trigger"
                            type="button"
                            @click.prevent="sorting = true"
                            :disabled="!getActiveTasks.length">
                        <template v-if="sorting">
                            Redo!
                        </template>
                        <template v-else>
                            Begin!
                        </template>
                    </button>
                </form>

                <template v-if="sorting">
                    <eisenhower-sorting :sorting.sync="sorting"/>
                </template>
                <template v-else-if="!sorting">
                    <ul class="task-list">
                        <li v-for="(task, i) in test"
                            :key="i">
                            {{ task.taskCategories }}
                            <font-awesome-icon
                                    icon="times-circle"
                                    class="task-item-close"
                                    @click="removeItem(task.id)"/>
<pre>
    {{task}}
</pre>
                            <ul v-if="task.taskCategories">
                            </ul>
                        </li>
                    </ul>
                </template>

                <eisenhower-sorted-list class="sorted-list" v-if="!sorting && getActiveTasksWithCategories.length"/>

                <pre>Test: {{ test }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
    import Task from '@/models/Task'
    import StatesEnum from "@/enums/StatesEnum";
    import TaskService from "@/services/TaskService";
    import EisenhowerSorting from "@/components/forms/EisenhowerSorting/componet.vue";
    import EisenhowerSortedList from "@/components/lists/EisenhowerSortedList/component.vue";

    export default {
        data: () => ({
            hide: false,
            task: '',
            sorting: false,
            ordered_tasks: []
        }),
        mixins: [
            TaskService
        ],
        components: {
            EisenhowerSorting,
            EisenhowerSortedList
        },
        methods: {
            addItem() {
                if (this.sorting) {
                    this.sorting = false;
                }

                if (this.task.trim() !== '') {
                    Task.insert({
                        data: [
                            {
                                title: this.task,
                                state_id: StatesEnum.ACTIVE
                            }
                        ]
                    }).then(() => {
                        // clear the input field
                        this.task = '';
                    });
                }
            },
            removeItem(id) {
                Task.update({
                    id,
                    state_id: StatesEnum.DELETED
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
</style>
