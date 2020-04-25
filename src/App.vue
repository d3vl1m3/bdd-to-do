<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                <h1>What needs doing?</h1>

                <form @submit.prevent="addItem" v-if="!sorting">
                    <input type="text"
                           class="new-task-input"
                           v-model="task">
                    <button class="new-task-submit"
                            type="submit">
                        Add
                    </button>

                    <button class="task-sort-trigger"
                            type="button"
                            @click.prevent="sorting = true">
                        <template v-if="sorting">
                            Redo!
                        </template>
                        <template v-else>
                            Begin!
                        </template>
                    </button>
                </form>

                <template v-if="sorting">
                    <form class="task-sorter"
                          ref="task-sorter"
                          @submit.prevent="triggerOrderedSorting()">
                        <h2 class="mt-4">How urgent/important is each task?</h2>

                        <div v-for="(task, i) in activeTasks"
                             :key="i"
                             class="sorting-task__item-questions sorting-task-question-container my-4 p-3">
                            <h3>{{ task.title }}</h3>

                            <ul class="container">
                                <li class="row row-cols-2">
                                    <sorter-radio-group v-bind="{
                                        legend_text: 'How Important?',
                                        group_id: task.id,
                                        group_type: important_group_title
                                    }"/>
                                    <sorter-radio-group v-bind="{
                                        legend_text: 'How Urgent?',
                                        group_id: task.id,
                                        group_type: urgent_group_title
                                    }"/>
                                </li>
                            </ul>
                        </div>

                        <button type="submit"
                                class="btn btn-primary my-2"
                        >Done!</button>
                    </form>
                </template>

                <template v-else-if="!sorting">
                    <ul class="task-list">
                        <li v-for="(task, i) in activeTasks"
                            :key="i">
                            {{ task.title }}
                            <font-awesome-icon
                                    icon="times-circle"
                                    class="task-item-close"
                                    @click="removeItem(task.id)"/>
                        </li>
                    </ul>
                </template>

                <ul class="sorted-list" v-if="!sorting && ordered_tasks.length">
                    <li v-for="(task, i) in ordered_tasks"
                        :key="i">{{ task.title }}
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    import sorterRadioGroup from "@/components/sorterRadioGroup/component"
    import Task from '@/models/Task'
    import StatesEnum from "@/enums/StatesEnum";
    import EHPEnum from "@/enums/EisenhowerPrincipleEnum";
    import Tag from "@/models/Tag";

    export default {
        data: () => ({
            hide: false,
            task: '',
            sorting: false,
            ordered_tasks: [],
            important_group_title: EHPEnum.getPropertyByValue(EHPEnum.IMPORTANT).name,
            urgent_group_title: EHPEnum.getPropertyByValue(EHPEnum.URGENT).name,
        }),
        computed: {
            activeTasks() {
                return Task.query().where('state_id', StatesEnum.ACTIVE).get();
            }
        },
        components: {
            sorterRadioGroup
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
            },
            triggerOrderedSorting() {
                const formValues = new FormData(this.$refs['task-sorter']).entries();

                for (const [key, order] of formValues) {
                    const [tag_name, task_id] = key.split("_");
                    Task.insertOrUpdate({
                        data: {
                            id: task_id,
                            tags: [
                                {
                                    ...Tag.find(EHPEnum.getPropertyByName(tag_name).value),
                                    pivot: {
                                        order
                                    }
                                }
                            ]
                        }
                    });

                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
</style>
