<template>
  <div>
    <label
      :class="isToggled ? 'bg-primary-500' : 'bg-secondary-500'"
      class="relative inline-flex h-6 w-[46px] items-center rounded-full transition-all duration-150 cursor-pointer"
    >
      <input
        type="checkbox"
        v-model="isToggled"
        @change="emitToggle"
        class="hidden"
      />
      <span
        :class="
          isToggled
            ? 'ltr:translate-x-6 rtl:-translate-x-6'
            : 'ltr:translate-x-[2px] rtl:translate-x-[-2px]'
        "
        class="inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-150"
      />
    </label>
  </div>

</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data() {
  
    return {
      isToggled: this.modelValue, // Sync the prop with local state
    };
  },
  methods: {
    emitToggle() {
      this.$emit("update:modelValue", this.isToggled); // Emit the updated value
    },
  },
  watch: {
    modelValue(newValue) {
      this.isToggled = newValue; // Sync changes from parent
    },
  },
};
</script>

<style scoped>
/* Additional styles if necessary */
</style>
