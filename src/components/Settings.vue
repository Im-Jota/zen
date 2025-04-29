<template>
  <Dialog
    :show="settings.state"
    @open="settings.updateState"
    title="Settings"
  >
    <div class="nav">
      <Button
        bound
        wFull
        v-for="(item, index) in navs"
        :title="item.title"
        :icon="item.icon"
        iconLeft
        @click="changeTab(index)"
        :class="[ index == tab ? 'bg' : 'no-bg' ]"
      />
    </div>

    <div class="main">
      <div v-if="tab === 0">
        <div class="flex justify-between align-center">
          <span>Shortcuts</span>
          <Switch @click="settings.changeShortcuts()" :state="settings.shortcuts" />
        </div>
      </div>

      <div v-if="tab === 1" class="settings">
        <div class="flex justify-between align-center">
          <span>Dark Mode</span>
          <Switch @click="settings.setTheme()" :state="settings.theme == 'dark'" />
        </div>
        <div class="flex justify-between align-center">
          <span>Personalize</span>
          <Switch @click="widgets.changeState" :state="widgets.state == true" />
        </div>
        <div class="flex justify-between align-center">
          <span>Background</span>
          <Dropdown v-model="background.type" :options="backgrounds" @change="changeBackground()"/>
        </div>

        <div v-if="background.type == 'Solid'" class="column ga-1">
          <div class="flex justify-between">
            <span>Color</span>
            <div class="flex ga-1">
              <label>Default</label>
              <input type="checkbox" v-model="background.default"/>
            </div>
          </div>
          <ColorPicker v-model="background.color" class="self-end" v-if="!background.default" />
        </div>

        <div v-if="background.type == 'Gradient'" class="column ga-1">
          <span>Gradients</span>
          <div class="flex ga-1">
            <div 
              v-for="(item, index) in gradients"
              class="card"
              :class="[item, [ background.class == item ? 'active' : '' ]]"
              @click="changeBackground(item)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
  import Button from './UI/Button.vue';
  import Dialog from './UI/Dialog.vue';
  import Switch from './UI/Switch.vue';
  import Dropdown from './UI/Dropdown.vue';
  import ColorPicker from './UI/ColorPicker.vue';
  import useTabStore from '../stores/useTabStore.js';
  import useWidgets from '../stores/useWidgets.js';

  export default {
    data() {
      return {
        modal: false,
        tab: 0,
        settings: useTabStore(),
        widgets: useWidgets(),
        background: {
          type: null,
          default: true,
          class: 'bg-orange',
          color: null,
        },
        navs: [
          {
            title: 'General',
            icon: "rivet-icons:settings",
          },
          {
            title: 'Visual',
            icon: "material-symbols-light:palette-outline",
          },
        ],
        gradients: ['bg-orange', 'bg-green', 'bg-deal', 'bg-purple'],
        backgrounds: ['Solid', 'Gradient', 'Unsplash']
      }
    },

    components: {
      Button,
      Dialog,
      Switch,
      Dropdown,
      ColorPicker,
    },

    mounted() {
      this.loadSettings();
    },

    methods: {
      openModal() {
        this.modal = !this.modal;
      },

      loadSettings() {
        this.settings = useTabStore();
        this.background = this.settings.background;
      },

      changeTab(index) {
        this.tab = index;
      },

      changeBackground(clas){
        if(clas) {
          this.background.class = clas;
        }
        console.log(this.background)
        this.settings.changeBackground(this.background);
      },
    }
  }
</script>

<style scoped>
.nav {
  background-color: var(--bg-secondary);
  border-radius: .4rem;
  padding: .2rem .3rem;
  display: flex;
  justify-content: space-around;
  gap: .3rem;
}

.main {
  padding: 1.5rem 0;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  width: 60px;
  height: 60px;
  border-radius: .5rem;
}

.card.active {
  box-shadow: 0 0 4px var(--text-color);
}
</style>
