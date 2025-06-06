<template>
    <div :class="['recommendations', isMobile ? 'mobile' : 'desktop']">
      <div class="recommendations-header">
        <h2>Recommendations for you</h2>
      </div>
      <div class="recommendations-list">
        <a
          v-for="item in recommendations"
          :key="item.id"
          :href="item.url"
          class="recommendation-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="recommendation-content">
            <div class="recommendation-image">
              <img :src="item.imageUrl" alt="" />
            </div>
            <div class="recommendation-text">
              <h3>{{ item.title }}</h3>
              <p>{{ item.excerpt }}</p>
              <span v-if="item.sponsored" class="sponsored">Sponsored</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Recommendations',
    setup() {
      const isMobile = ref(false);
  
      const checkIsMobile = () => {
        isMobile.value = window.innerWidth <= 768;
      };
  
      onMounted(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
      });
  
      const recommendations = ref([
        {
          id: 1,
          title: 'Play and win with Stake!',
          excerpt: 'Discover a world of entertainment with Stake. Play your favorite games and win big, all from the comfort of your home.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Stake-com-logo-high-res.jpg',
          url: '#',
          sponsored: true,
        },
        {
          id: 2,
          title: 'Discover new ways to have fun',
          excerpt: 'Enjoy exciting online experiences with Stake. Feel the adrenaline every moment, explore now!',
          imageUrl: 'https://images.seeklogo.com/logo-png/43/2/stake-logo-png_seeklogo-436813.png',
          url: '#',
          sponsored: true,
        },
        {
          id: 3,
          title: 'Luck is on your side',
          excerpt: 'With Stake, opportunities are within your reach. Play, win, and enjoy an online casino with security and great prizes.',
          imageUrl: 'https://images-platform.99static.com/5OeGxmE5YiSgklZphg_FhAFxZRk=/104x104:936x936/500x500/top/smart/99designs-contests-attachments/128/128668/attachment_128668923',
          url: '#',
          sponsored: true,
        },
      ]);
  
      return {
        recommendations,
        isMobile,
      };
    },
  };
  </script>
  
  <style scoped>
  .recommendations {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  .recommendations.mobile {
    width: 100%;
    margin-top: 20px;
  }
  .recommendations.desktop {
    width: 100%;
    width: 480px;
  }
  .recommendations-header {
    padding: 12px;
    background: rgba(0, 123, 255, 0.05);
    border-bottom: 1px solid #eee;
  }
  .recommendations-header h2 {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  .recommendations-list {
    display: flex;
    flex-direction: column;
  }
  .recommendation-card {
    padding: 12px;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s ease;
  }
  .recommendation-card:hover {
    background: #f9f9f9;
  }
  .recommendation-content {
    display: flex;
    gap: 12px;
  }
  .recommendation-image {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    background: #eee;
  }
  .recommendation-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .recommendation-text {
    flex: 1;
    min-width: 0;
  }
  .recommendation-text h3 {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .recommendation-text p {
    font-size: 12px;
    color: #666;
    margin: 4px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .sponsored {
    font-size: 10px;
    color: #999;
  }
  </style>
  