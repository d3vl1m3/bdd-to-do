<template>
    <fieldset class="sorter-radio-group__single">
        <legend v-if="legend_text">{{ legend_text }}</legend>
        <span v-for="n in 5"
              :key="n"
              class="sorter-radio-group__form-check form-check">
            <input type="radio"
                   class="form-check-input"
                   :id="`${prefix}_order-${n}`"
                   :name="`${prefix}`"
                   :value="n">
            <label class="form-check-label d-block pr-3"
                   :for="`${prefix}_order-${n}`">{{ n }}</label>
        </span>
    </fieldset>
</template>

<script>
    import Vue from "vue";

    export default Vue.component('RadioButtonCollection', {
        data() {
            return {
                prefix: `${(this.task.$id).replace('$', '')}_${(this.category.$id).replace('$', '')}`,
            }
        },
        props:  {
            legend_text: {
                type: String,
                default: ''
            },
            task: {
                type: Object,
                required: true
            },
            category: {
                type: Object,
                required: true
            }
        }
    });

</script>

<style lang="scss">
    .sorter-radio-group {
        &__form-check {
            display: inline-block!important;
        }
    }
</style>