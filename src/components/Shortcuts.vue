<template>
  <div class="flex ga-1">
    <a v-for="(item, index) in links"
      :href="item.url"
      class="card column ga-1 align-center"
      :class="{ 'white' : settings.background.type == 'Unsplash' }"
    >
      <img :src="item.logo" width="30"  />
      {{ item.name }}
    </a>
  </div>
</template>

<script>
  import useTabStore from '../stores/useTabStore.js';
  export default {
    data() {
      return {
        settings: new useTabStore(),
        links: [
          {
            name: 'Facebook',
            url: 'https://www.facebook.com',
            logo: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=64'
          },
          {
            name: 'Instagram',
            url: 'https://www.instagram.com',
            logo: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=64'
          },
          {
            name: 'Whatsapp',
            url: 'https://web.whatsapp.com/',
            logo: 'https://www.google.com/s2/favicons?domain=web.whatsapp.com&sz=64'
          }
        ]
      }
    },
  }
</script>

<style scoped>
.card {
  text-decoration: none;
  color: var(--text-color);
}

</style>
