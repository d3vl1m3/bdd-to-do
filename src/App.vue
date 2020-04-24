<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                <h1>What needs doing?</h1>

                <form @submit.prevent="addItem">

                    <input type="text"
                           class="new-task-input"
                           v-model="task">
                    <button class="new-task-submit"
                            type="submit">
                        Add
                    </button>

                    <button class="task-sort-trigger"
                            type="button"
                            @click="beginSorting()"
                            :disabled="!tasks.length">
                        <template v-if="sorting">
                            Redo!
                        </template>
                        <template v-else>
                            Begin!
                        </template>
                    </button>

                </form>

                <template v-if="sorting && tasks.length">
                    <form class="task-sorter"
                          @submit.prevent="orderTaskItems()">
                        <h2 class="mt-4">How urgent/important is each task?</h2>

                        <div v-for="(task, i) in tasks"
                             :key="i"
                             class="sorting-task__item-questions sorting-task-question-container my-4 p-3">
                            <h3>{{ task }}</h3>

                            <ul class="container">
                                <li class="row row-cols-2">
                                    <sorter-radio-group v-bind="{
                                        legend_text: 'How Important?',
                                        group_id: i,
                                        group_type: 'important'
                                    }"/>
                                    <sorter-radio-group v-bind="{
                                        legend_text: 'How Urgent?',
                                        group_id: i,
                                        group_type: 'urgent'
                                    }"/>
                                </li>
                            </ul>

                        </div>

                        <button type="submit" class="btn btn-primary my-2">Done!</button>
                    </form>
                </template>

                <template v-else-if="tasks.length && !sorting">
                    <ul class="task-list">
                        <li v-for="(task, i) in tasks"
                            :key="i">
                            {{ task }}
                            <font-awesome-icon
                                    icon="times-circle"
                                    class="task-item-close"
                                    @click="removeItem(i)"/>
                        </li>
                    </ul>
                </template>

                <ul class="sorted-list" v-if="!sorting && ordered_tasks">
                    <li v-for="(task, i) in ordered_tasks"
                        :key="i">{{ task }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import sorterRadioGroup from "@/components/sorterRadioGroup/component";

    export default {
        data: () => ({
            hide: false,
            task: '',
            tasks: [],
            ordered_tasks: [],
            sorting: false
        }),
        components: {
            sorterRadioGroup
        },
        methods: {
            addItem() {
                if (this.sorting) {
                    this.sorting = false;
                }

                if (this.task.trim() !== '') {
                    this.tasks.push(this.task);
                    this.task = '';
                }
            },
            removeItem(i) {
                if (this.tasks[i]) { // simple check to make sure it exists 🤷‍
                    this.tasks.splice(i, 1);
                }
            },
            beginSorting() {
                this.sorting = true;
            },
            orderTaskItems() {
                // using the data from the sort fields
                this.sorting = false;
            }
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
</style>
