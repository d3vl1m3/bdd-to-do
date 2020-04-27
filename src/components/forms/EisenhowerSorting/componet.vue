<template>
    <form id="task-sorter"
          ref="task-sorter"
          @submit.prevent="triggerOrderedSorting()">
        <h2 class="mt-4">How urgent/important is each task?</h2>

        <div v-for="(task, i) in getActiveTasks"
             :key="i"
             class="sorting-task__item-questions sorting-task-question-container my-4 p-3">
            <h3>{{ task.title }}</h3>

            <ul class="container">
                <li class="row row-cols-2">
                    <radio-button-collection v-bind="{
                                        legend_text: 'How Important?',
                                        task,
                                        category: categories[1]
                                    }"/>
                    <radio-button-collection v-bind="{
                                        legend_text: 'How Urgent?',
                                        task,
                                        category: categories[0]
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

<script>
    import Vue from 'vue';
    import Category from "@/models/Category";
    import RadioButtonCollection from "@/components/inputs/RadioButtonCollection/component.vue";
    import TaskService from "@/services/TaskTemplateService";
    import TaskCategory from "@/models/TaskCategory";


    export default Vue.component('EisenhowerSorting', {
        data() {
            return {
                categories: Category.query().where('parent_id', '$uid1').get()
            }
        },
        props: {
            sorting: {
                type: Boolean,
                require: true
            }
        },
        components: {
            RadioButtonCollection
        },
        mixins: [
            TaskService
        ],
        methods: {
            triggerOrderedSorting() {
                const formData = Array.from(new FormData(this.$refs['task-sorter']).entries());

                formData.forEach((i) => {
                    const [task_id, category_id] = i[0].split("_");
                    const order = i[1];
                    TaskCategory.insert({
                        data: {
                            task_id: `$${task_id}`,
                            category_id: `$${category_id}`,
                            order,
                        }
                    })
                });

                this.$emit('update:sorting', false);
            }
        }
    })
</script>