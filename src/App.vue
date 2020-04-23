<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                <h1>What needs sorting?</h1>
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
                          @submit.prevent>
                        <h2>How urgent/important is each task?</h2>
                        <div v-for="(task, i) in tasks"
                             :key="i"
                             class="sorting-task-question-container">
                            <h3>{{ task }}</h3>
                            <div class="container">
                                <div class="row row-cols-2">
                                    <div>
                                        <fieldset>
                                            <legend>How important?</legend>
                                            <div class="container">
                                                <div class="row row-cols-5">
                                                    <div v-for="n in 5"
                                                         :key="n"
                                                         class="form-check">
                                                        <input type="radio"
                                                               class="form-check-input"
                                                               :id="`important_${i}_${n}`"
                                                               :name="`important_${i}`">
                                                        <label class="form-check-label d-block"
                                                                :for="`important_${i}_${n}`">{{ n }}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div>
                                        <fieldset>
                                            <legend>How urgent?</legend>
                                            <div class="container">
                                                <div class="row row-cols-5">
                                                    <div v-for="n in 5"
                                                        :key="n"
                                                        class="form-check">
                                                        <input type="radio"
                                                               class="form-check-input"
                                                               :id="`urgency_${i}_${n}`"
                                                               :name="`urgency_${i}`">
                                                        <label class="form-check-label d-block"
                                                                :for="`urgency_${i}_${n}`">{{ n }}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary my-2">Done!</button>
                    </form>
                </template>
                <template v-else-if="tasks.length && !sorting">
                    <ul class="task-list" >
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            hide: false,
            task: '',
            tasks: [],
            sorting: false
        }),
        methods: {
            addItem() {
                if ( this.sorting) {
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
            }
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
