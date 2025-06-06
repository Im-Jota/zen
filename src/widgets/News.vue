<template>
    <div class="highlight-container">
      <div class="highlight-card">
        <h2>{{ highlights[currentIndex].title }}</h2>
        <p>{{ highlights[currentIndex].desc }}</p>
        <a :href="highlights[currentIndex].link" target="_blank">Saber más</a>
      </div>
  
      <!-- Indicadores clickeables -->
      <div class="carousel-indicators">
        <div
          v-for="(item, index) in highlights"
          :key="index"
          class="indicator"
          :class="{ active: index === currentIndex }"
          @click="goToCard(index)"
        >
          <div v-if="index === currentIndex" class="progress-bar" :key="animationKey"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        highlights: [
          {
            title: "VPN Nova",
            desc: "Protege tu navegación con cifrado de grado militar.",
            link: "https://tuvpn.com",
          },
          {
            title: "Llamadas Privadas",
            desc: "Videollamadas seguras desde el navegador.",
            link: "https://tullamada.com",
          },
          {
            title: "Extensión Antirastreo",
            desc: "Bloquea scripts y cookies de rastreo con un clic.",
            link: "https://tuextension.com",
          },
        ],
        currentIndex: 0,
        interval: null,
        animationKey: 0,
      };
    },
    mounted() {
      this.startAutoChange();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    methods: {
      startAutoChange() {
        this.interval = setInterval(() => {
          this.nextCard();
        }, 6000);
      },
      nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.highlights.length;
        this.animationKey++;
      },
      goToCard(index) {
        this.currentIndex = index;
        this.animationKey++;
        clearInterval(this.interval);
        this.startAutoChange();
      },
    },
  };
  </script>
  
  <style scoped>
  .highlight-container {
    width: 100%;
    min-width: 100px;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    position: relative;
  }
  
  .highlight-card {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .highlight-card h2 {
    margin-top: 0;
    font-size: 22px;
    color: #333;
  }
  
  .highlight-card p {
    color: #555;
    margin: 10px 0;
  }
  
  .highlight-card a {
    display: inline-block;
    margin-top: 10px;
    text-decoration: none;
    color: #0073e6;
    font-weight: bold;
  }
  
  /* Indicadores */
  .carousel-indicators {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    height: 14px;
    gap: 10px;
  }
  
  .indicator {
    flex: 1;
    height: .2rem;
    background-color: #e0e0e0;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    transform: scaleY(1);
    cursor: pointer;
  }
  
  .indicator.active {
    flex: 2;
    background-color: #0073e6;
    transform: scaleY(1.6);
  }
  
  .progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    animation: loadingBarReverse 6s linear forwards;
    width: 100%;
  }
  
  @keyframes loadingBarReverse {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
  </style>
  