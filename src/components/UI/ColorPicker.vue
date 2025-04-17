<template>
  <div class="color-picker">
    <Sketch v-model="color" @change="emitColor" />
  </div>
</template>

<script>
import { Sketch } from '@ckpack/vue-color'

export default {
  name: 'ColorPicker',
  components: { Sketch },
  props: {
    modelValue: String,
  },
  data() {
    return {
      color: {
        hex: this.modelValue || '#ffffff',
      },
    }
  },
  watch: {
    modelValue(newColor) {
      this.color.hex = newColor
    },
  },
  methods: {
    emitColor(colorData) {
      this.$emit('update:modelValue', colorData.hex)
    },
  },
}
</script>

