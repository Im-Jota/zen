<template>
    <div class="grid-stack">
      <div
        v-for="(item, index) in widgets.widgets"
        :key="item.id"
        class="grid-stack-item"
        :class="{'active' : widgets.state}"
        :gs-id="item.id"
        :gs-x="item.x"
        :gs-y="item.y"
        :gs-w="item.w"
        :gs-h="item.h"
      >
        <div class="grid-stack-item-content">
          <!-- Usa component dinámico -->
          <component :is="loadWidget(item.component)" />
        </div>
      </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import useWidgets from '../stores/useWidgets.js';
import { GridStack } from "gridstack";
export default {
    data() {
        return {
            grid: null,
            widgets: useWidgets(),
        }
    },

    watch: {
      'widgets.state': function() {
        this.grid.enableMove(this.widgets.state);
        this.grid.enableResize(this.widgets.state);
      }
    },

    mounted() {
        this.grid = GridStack.init({
        float: true,
        cellHeight: "70px",
      });

      this.grid.enableMove(this.widgets.state);
      this.grid.enableResize(this.widgets.state);

      // Escuchar los cambios de posición y tamaño en los widgets
      this.grid.on('change', (event, el) => {
        // const node = grid.getNode(el);
        const nodes = this.grid.getGridItems();

        // Buscar el nodo correspondiente al elemento actual (el)
        const node = nodes.find(item => item === el[0].el).gridstackNode;

        // Crear el objeto del widget actualizado
        const widgetData = {
          id: parseInt(node.id),
          x: node.x,
          y: node.y,
          w: node.w,
          h: node.h,
        };
        
        this.widgets.updateWidget(widgetData);
      })
    },

    methods: {
        loadWidget(name) {
            return defineAsyncComponent(() => import(`../widgets/${name}.vue`));
        },

        toggleEditMode() {
            editMode.value = !editMode.value;
            grid.enableMove(editMode.value);
            grid.enableResize(editMode.value);
        },
    }
}
</script>

<style scoped>
.grid-stack {
  width: 100%;
}

.grid-stack-item {
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-stack-item-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-stack-item.active {
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .4);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}
</style>