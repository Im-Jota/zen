import { defineStore } from 'pinia';

const useWidgets = defineStore('widgets', {
  state: () => ({
    widgets: [
      {
        id: 1,
        x: 0,
        y: 0,
        w: 4,
        h: 1,
        name: 'search',
        component: 'Search',
      },
      {
        id: 2,
        x: 11,
        y: 0,
        w: 1,
        h: 1,
        name: 'setting',
        component: 'Setting',
      },
      {
        id: 3,
        x: 5,
        y: 2,
        w: 1,
        h: 1,
        name: 'clock',
        component: 'Clock',
      },
      {
        id: 4,
        x: 1,
        y: 0,
        w: 1,
        h: 1,
        name: 'logo',
        component: 'Logo',
      },
      {
        id: 5,
        x: 3,
        y: 0,
        w: 1,
        h: 1,
        name: 'marked',
        component: 'Marked'
      }
    ],
    state: true,
  }),

  actions: {
    updateWidget(widget) {
      const data = this.widgets.map(item => {
        if(item.id == widget.id) {
          item.x = widget.x;
          item.y = widget.y;
          item.w = widget.w;
          item.h = widget.h;
        }
        return item;
      });
      this.widgets = data;
    },

    changeState() {
      this.state = !this.state;
    }
  },

  persist: {
    enable: true,
    storage: localStorage,
  }
})

export default useWidgets;
