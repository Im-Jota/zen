import { defineStore } from 'pinia';

const useTabStore = defineStore('tabStore', {
  state: () => ({
    theme: 'light',
    background: {
      type: 'Gradient',
      default: true,
      class: 'bg-orange',

    },
    shortcuts: true,
  }),

  actions: {
    loadSettings () {
      document.documentElement.setAttribute('data-theme', this.theme);

      this.changeBackground();
    },

    setTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    changeBackground(background){
      if(background) {
        this.background = background;
      }

      const body = document.getElementsByTagName('body')[0];
      switch(this.background.type) {
        case 'Solid':
          this.background.default ? '' : body.style.backgroundColor = this.background.color;
          body.className = '';
          break;
        case 'Gradient':
          if(this.background.default) {
            body.className = '';
            body.classList.add(this.background.class);
          } else {
            console.log('soon');
          }
          break;
        case 'Unsplash':
          body.className = '';
      }
    },

    changeShortcuts() {
      this.shortcuts = !this.shortcuts;
      console.log(this.shortcuts)
    },
  },

  persist: {
    enable: true,
    storage: localStorage,
  }
})

export default useTabStore;
