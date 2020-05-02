<template>
    <ul v-if="tasks.length">
        <li v-for="(task, i) in tasks" :key="i">
            {{ task.title }}
            <button v-if="!task.done"
                    class="task-item-done"
                    @click="markItemAsDone(task.id)">
                Done
                <font-awesome-icon icon="check"/>
            </button>

            <button v-if="task.done"
                    class="task-item-not-done"
                    @click="markItemAsNotDone(task.id)">
                Not done
                <font-awesome-icon icon="times"/>
            </button>

            <button class="task-item-remove"
                    @click="removeItem(task.id)">
                Delete
                <font-awesome-icon icon="trash"/>
            </button>
        </li>
    </ul>
</template>

<script>
    import Vue from "vue";
    import Task from "@/models/Task";
    import ActiveStatesEnum from "@/enums/ActiveStatesEnum";
    import DoneStatesEnum from "@/enums/DoneStatesEnum";

    export default Vue.component('TaskList', {
        props: {
            tasks: {
                type: Array,
                required: true
            }
        },
        methods: {
            removeItem(id) {
                Task.update({
                    where: id,
                    data: {
                        state_id: ActiveStatesEnum.DELETED
                    }
                });
            },
            markItemAsDone(id) {
                Task.update({
                    where: id,
                    data: {
                        done: DoneStatesEnum.DONE
                    }
                });
            },
            markItemAsNotDone(id) {
                Task.update({
                    where: id,
                    data: {
                        done: DoneStatesEnum.NOT_DONE
                    }
                });
            }
        }

    });
</script>