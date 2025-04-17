<template>
  <input 
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    @keydown.enter="onEnter"
  >
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      placeholder: String,
      modelValue: {
        type: String,
        default: ''
      },
      round: {
        type: Boolean,
        default: false,
      },
      rounded: {
        type: Boolean,
        default: false,
      }
    },

    methods: {
      onInput(event) {
        this.$emit('update:modelValue', event.target.value);
      },

      onEnter() {
        this.$emit('enter-pressed', this.modelValue);  // Emite un evento 'enter-pressed'
      }
    },
  }
</script>

<style scoped>
input {
  width: 100%;
  padding: .5rem 1rem;
  border: none;
}

input:focus {
  outline: none;
}
</style>
