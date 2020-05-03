<template>
    <li>
        {{ task.title }}
        <button v-if="!task.done && isActive"
                class="task-item-done"
                @click="itemDone()">
            Done
            <font-awesome-icon icon="check"/>
        </button>

        <button v-if="task.done && isActive"
                class="task-item-not-done"
                @click="itemNotDone()">
            Not done
            <font-awesome-icon icon="times"/>
        </button>

        <button v-if="isActive"
                class="task-item-remove"
                @click="removeItem()">
            Delete
            <font-awesome-icon icon="trash"/>
        </button>

        <button v-if="isDeleted"
                class="task-item-recover"
                @click="recoverItem()">
            Recover
            <font-awesome-icon icon="history"/>
        </button>
    </li>
</template>

<script>
    import Vue from 'vue';
    import ActiveStatesEnum from "@/enums/ActiveStatesEnum";
    import Task from "@/models/Task";
    import DoneStatesEnum from "@/enums/DoneStatesEnum";

    export default Vue.component('TaskItem', {
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        computed: {
            isActive() {
                return ActiveStatesEnum.ACTIVE === this.task.state_id
            },
            isDeleted() {
                return ActiveStatesEnum.DELETED === this.task.state_id
            }
        },
        methods: {
            recoverItem() {
                Task.update({
                    where: this.task.id,
                    data: {
                        state_id: ActiveStatesEnum.ACTIVE
                    }
                });
            },
            removeItem(){
                Task.update({
                    where: this.task.id,
                    data: {
                        state_id: ActiveStatesEnum.DELETED
                    }
                });
            },
            itemDone() {
                Task.update({
                    where: this.task.id,
                    data: {
                        done: DoneStatesEnum.DONE
                    }
                });
            },
            itemNotDone() {
                Task.update({
                    where: this.task.id,
                    data: {
                        done: DoneStatesEnum.NOT_DONE
                    }
                });
            }
        }
    });
</script>