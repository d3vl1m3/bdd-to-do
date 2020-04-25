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
                        >Done!
                        </button>
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

                            <ul v-if="task.tags">
                                <li v-for="(tag, i) in task.tags" :key="i">
                                    {{ tag.title }} {{ tag.pivot.order }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </template>

                <ul class="sorted-list" v-if="!sorting && ordered_tasks.length">
                    <li v-for="(task, i) in ordered_tasks"
                        :key="i">{{ task.title }}
                    </li>
                </ul>
                <pre>
{{ activeTasks }}
</pre>

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
            important_group_title: EHPEnum.getPropertyById(EHPEnum.IMPORTANT).name,
            urgent_group_title: EHPEnum.getPropertyById(EHPEnum.URGENT).name,
        }),
        computed: {
            activeTasks() {
                return Task.query().where('state_id', StatesEnum.ACTIVE).with('tags').get();
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
                const formData = Array.from(new FormData(this.$refs['task-sorter']).entries());

                formData.forEach((i) => {
                    const [tag_name, task_id] = i[0].split("_");
                    const tag = Tag.query().where('title', tag_name).get();
                    console.log(tag.id, task_id);
                    // @todo: Figure out a decent parent/child system for tags
                    // Task.insertOrUpdate({
                    //     data: [{
                    //         id: `$${task_id}`,
                    //         tags: [
                    //             {
                    //
                    //                 pivot: {
                    //                     tag_id: tag.id,
                    //                     order: i[1]
                    //                 }
                    //             }
                    //         ]
                    //     }]
                    // })
                });

                this.sorting = false;
            }
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
</style>
