<template>
    <fieldset class="sorter-radio-group__single">
        <legend v-if="legend_text">{{ legend_text }}</legend>
        <span v-for="n in 5"
              :key="n"
              class="sorter-radio-group__form-check form-check">
            <input type="radio"
                   class="form-check-input"
                   :id="`${group_type}_${group_id}_${n}`"
                   :name="`${group_type}_${group_id}`"
                   :value="n">
            <label class="form-check-label d-block pr-3"
                   :for="`${group_type}_${group_id}_${n}`">{{ n }}</label>
        </span>
    </fieldset>
</template>

<script>
    import Vue from "vue";

    export default Vue.component('sorterRadioGroup', {
        props:  {
            legend_text: {
              type: String,
              default: ''
            },
            group_type: {
                type: String,
                required: true // e.g. 'important' or 'urgent'
            },
            group_id: {
                type: String,
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