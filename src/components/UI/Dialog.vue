<template>
  <div
    class="containerDialog"
    :class="{'show' : show}"
    @click="closeModal"
  >
    <div 
      class="dialog"
      :class="{'show' : show}"
      @click.stop
    >
      <div class="header">
        <h2>{{ title}}</h2>
        <Button
          @click="closeModal"
          icon="iconamoon:close-thin"
          class="text-color"
          size="22px"
          flat
          bound
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Button from './Button.vue';
  export default {
    emits: ['open'],
    props: {
      show: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },

    components: {
      Button
    },

    methods: {
      closeModal() {
        this.$emit('open')
      }
    },
  }
</script>

<style scoped>
.containerDialog {
  position: absolute;
  top: 0;
  right: 0;
  width: 0%;
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
  box-sizing: border-box;
  transition: .3s ease-in-out background, 1s ease-in-out width;
}

.containerDialog.show {
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  transition: 3s ease-in-out background, .6s ease-in-out width;
}

.dialog {
  width: 100%;
  min-width: 250px;
  max-width: 400px;
  height: calc(100% - .8rem);
  position: absolute;
  right: -400px;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: .6rem;
  padding: 1rem;
  margin: .4rem 0;
  transition: 1s ease-in-out;
}

.dialog.show {
  right: .4rem;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
}

.header h2 {
  font-size: 1rem;
}
</style>
