<template>
    <div id="app">
        <div class="container">
            <div class="row-cols-1">
                Welcome to app
                <form @submit.prevent="addItem">
                    <input type="text"
                           class="new-task-input"
                           v-model="task">
                    <button class="new-task-submit" type="submit">Add</button>
                </form>

                <ul class="task-list" v-if="tasks.length">
                    <li v-for="(task, i) in tasks" :key="i">{{ task }} <i></i></li>
                </ul>
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
        }),
        methods: {
            addItem() {
                if ( this.task.trim() !== '' ) {
                    this.tasks.push(this.task);
                    this.task = '';
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/dist/css/bootstrap.min.css";
</style>
