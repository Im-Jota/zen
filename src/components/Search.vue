<template>
  <div class="search">
    <img src="../assets/favicon.png" />
    <Input placeholder="Search something" class="bg" v-model="text" @enter-pressed="search()" />
    <Button icon="material-symbols-light:search-rounded" size="25px" flat class="text-color" @click="search()" />
  </div>
</template>

<script>
  import Input from './UI/Input.vue';
  import Button from './UI/Button.vue';
  export default {
    data() {
      return {
        text: '',
      }
    },

    components: {
      Input,
      Button
    },

    methods: {
      search() {
        console.log(this.text);
        const query = encodeURIComponent(this.text);
        window.location.href = `https://astiango.co/?q=${query}`;
      }
    }
  }
</script>

<style scoped>
.search {
  width: 100%;
  min-width: 200px;
  max-width: 600px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  padding: .2rem 1rem;
  border-radius: 5rem;
  border: .01rem solid var(--orange);
  box-shadow: 0 0 .4rem var(--border-color);
}

.search img {
  width: 20px;
}
</style>
