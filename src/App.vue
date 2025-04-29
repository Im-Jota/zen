<template>
  <div class="viewport" :class="{ 'bg-cl' : tabStore.theme !== 'light' }">
    <img :src="backgroundImage" class="background" v-if="tabStore.background.type == 'Unsplash'" />
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
    <Settings :style="{color: textColor }" />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import useTabStore from './stores/useTabStore.js';
  import useWidgets from './stores/useWidgets.js';
  import UnsService from './services/UnsService.js';
  import Shortcuts from './components/Shortcuts.vue';
  import { GridStack } from "gridstack";

  export default {
    data() {
      return {
        loaded: true,
        canvas: null,
        grid: null,
        backgroundImage: "",
        textColor: "black",
        tabStore: useTabStore(),
        widgets: useWidgets(),
      }
    },

    components: {
      Settings: defineAsyncComponent(() => import('./components/Settings.vue')),
      Search: defineAsyncComponent(() => import('./components/Search.vue')),
      Shortcuts,
    },

    watch: {
      'widgets.state': function() {
        this.grid.enableMove(this.widgets.state);
        this.grid.enableResize(this.widgets.state);
      }
    },

    mounted() {
      this.load();
      this.loadSettings();

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
        return defineAsyncComponent(() => import(`./widgets/${name}.vue`));
      },

      toggleEditMode() {
        editMode.value = !editMode.value;
        grid.enableMove(editMode.value);
        grid.enableResize(editMode.value);
      },

      loadSettings() {
        this.tabStore.loadSettings();
      },

      async load() {
        try {
          const uns = new UnsService();
          await uns.setImagen();
          const imageUrl = uns.getUrl();
          this.backgroundImage = imageUrl;
          
          // Si el fondo es una imagen, calcular su luminosidad
          if (this.backgroundImage) {
            this.calculateLuminance(this.backgroundImage).then((luminance) => {
              this.updateTextColor(luminance);
            });
          } else if (this.backgroundColor) {
            this.updateTextColorForSolidBackground(this.backgroundColor);
          }
        } catch (e) {
          console.error("Error al cargar la imagen de fondo:", e);
        }
      },

      // Función para calcular la luminosidad de una imagen
      calculateLuminance(imageUrl) {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous'; // Permitir CORS
          img.src = imageUrl;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pixels = ctx.getImageData(0, 0, img.width, img.height);
            const data = pixels.data;
            let r = 0, g = 0, b = 0;
            
            // Recorremospadding los píxeles para obtener el promedio de R, G, B
            for (let i = 0; i < data.length; i += 4) {
              r += data[i];     // Red
              g += data[i + 1]; // Green
              b += data[i + 2]; // Blue
            }

            const totalPixels = data.length / 4;
            r = r / totalPixels;
            g = g / totalPixels;
            b = b / totalPixels;

            // Cálculo de la luminosidad
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            resolve(luminance);
          };
        });
      },

      // Función para cambiar el color del texto dependiendo de la luminosidad de la imagen
      updateTextColor(luminance) {
        this.textColor = luminance < 0.5 ? 'white' : 'black';
      },

      // Función para campaddingbiar el color del texto si el fondo es un color sólido
      updateTextColorForSolidBackground(color) {
        const luminance = this.calculateLuminanceForColor(color);
        this.textColor = luminance < 0.5 ? 'white' : 'black';
      },

      // Función para calcular la luminosidad de un color sólido (en formato RGB)
      calculateLuminanceForColor(color) {
        const rgb = color.match(/\d+/g);
        if (rgb) {
          const [r, g, b] = rgb.map(Number);
          return (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
        }
        return 0.5; // Retornar un valor medio por defecto si no se puede calcular
      },

    }
  }
</script>

<style scoped>
.viewport {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
}

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

.container {
  width: 100%;
  min-height: 100vh;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.main {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -3;
  object-fit: cover;
}

.bg-cl::after {
  content: '';
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .12);
  z-index: -2; /* Asegura que la capa esté por encima de la imagen pero debajo del texto */
}

.logo {
  width: 300px;
}
</style>
