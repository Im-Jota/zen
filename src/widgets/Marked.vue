<template>
  <div class="containerMarked">
    <div class="tabs">
      <button v-for="tab in categories" :key="tab" :class="['tab', { active: activeTab === tab }, {'text' : settings.background.type == 'Unsplash'}]"
        @click="setActiveTab(tab)">
        {{ tab }}
      </button>
    </div>

    <div class="grid">
      <a v-for="(item, index) in bookmarks[activeTab]" :key="index" class="card" @click="settings.openLinkTab(item.url)">
        <div class="column ga-1 align-center" :class="{ 'white': settings.background.type == 'Unsplash' }">
          <img :src="item.logo" width="30" />
          {{ item.title }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import useTabStore from '../stores/useTabStore.js';
export default {
  name: 'BookmarkTabs',
  data() {
    return {
      settings: new useTabStore(),
      categories: ['Recent', 'Personal', 'Work', 'Study'],
      activeTab: 'Recent',
      bookmarks: {
        Recent: [
          {
            title: 'Stake',
            url: 'https://stake.com',
            logo: 'https://www.google.com/s2/favicons?domain=stake.com&sz=64'
          },
          { 
            title: 'YouTube',
            url: 'https://youtube.com',
            logo: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64'
          },
          { 
            title: 'Reddit',
            url: 'https://reddit.com',
            logo: 'https://www.google.com/s2/favicons?domain=reddit.com&sz=64'
          },
          { 
            title: 'Spotify',
            url: 'https://spotify.com',
            logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=64'
          },
          { 
            title: 'GitHub',
            url: 'https://github.com',
            logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=64' 
          },
          { 
            title: 'Notion',
            url: 'https://notion.so',
            logo: 'https://www.google.com/s2/favicons?domain=notion.so&sz=64' 
          },
          { 
            title: 'MDN Web Docs',
            url: 'https://developer.mozilla.org',
            logo: 'https://www.google.com/s2/favicons?domain=mozilla.org&sz=64' 
          },
          { 
            title: 'FreeCodeCamp',
            url: 'https://freecodecamp.org',
            logo: 'https://www.google.com/s2/favicons?domain=freecodecamp.org&sz=64' 
          },
        ],
        Personal: [
          { 
            title: 'Reddit',
            url: 'https://reddit.com',
            logo: 'https://www.google.com/s2/favicons?domain=reddit.com&sz=64' 
          },
          { 
            title: 'Spotify',
            url: 'https://spotify.com',
            logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=64' 
          },
        ],
        Work: [
          { 
            title: 'GitHub',
            url: 'https://github.com',
            logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=64' 
          },
          { 
            title: 'Notion',
            url: 'https://notion.so',
            logo: 'https://www.google.com/s2/favicons?domain=notion.so&sz=64' 
          },
        ],
        Study: [
          { 
            title: 'MDN Web Docs',
            url: 'https://developer.mozilla.org',
            logo: 'https://www.google.com/s2/favicons?domain=mozilla.org&sz=64' 
          },
          { 
            title: 'FreeCodeCamp',
            url: 'https://freecodecamp.org',
            logo: 'https://www.google.com/s2/favicons?domain=freecodecamp.org&sz=64'
           },
        ],
      }
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style scoped>
.containerMarked {
  width: 100%;
  height: 100%;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab {
  background-color: transparent;
  color: var(--text-color);
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  font-weight: 600;
}

.tab.text {
  color: white;
}

.tab.active::before {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  width: 100%;
  max-width: 100px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--bg-blur);
  color: var(--text-color);
  backdrop-filter: blur(.2rem);
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}

img {
  width: 100%;
  max-width: 40px;
  border-radius: .4rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card .url {
  color: #bbb;
  font-size: 0.9rem;
  margin-top: 6px;
  word-break: break-all;
}

.edit {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1rem;
}

.edit:hover {
  color: #fff;
}
</style>