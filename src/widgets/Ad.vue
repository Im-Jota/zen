<template>
    <div class="promo-widget">
      <div class="promo-content">
        <img src="https://www.google.com/s2/favicons?domain=www.stake.com&sz=64" alt="Office" class="promo-icon" />
        <div class="promo-text">
          <div class="promo-header">
            <span class="promo-title">Experience the thrill of UFC live!</span>
            <span class="promo-label">Advertising</span>
          </div>
          <p class="promo-description">
            Catch all the UFC action in real-time with Stake. Watch the best fights and never miss a second of the action!
          </p>
          <a
            href="#"
            class="promo-button"
            target="_blank"
            rel="noopener noreferrer"
          >
          Watch now
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PromoWidget',
  };
  </script>
  
  <style scoped>
  .promo-widget {
    max-width: 360px;
    height: 100%;
    display: flex;
    background-color: rgba(20, 20, 20, .4);
    backdrop-filter: blur(.2rem);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(8px);
    font-family: 'Segoe UI', sans-serif;
    transition: transform 0.2s ease;
    cursor: default;
  }
  
  .promo-widget:hover {
    transform: translateY(-4px);
  }
  
  .promo-content {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  
  .promo-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: contain;
  }
  
  .promo-text {
    flex: 1;
  }
  
  .promo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .promo-title {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }
  
  .promo-label {
    background: #eaf5ff;
    color: #0078d4;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 999px;
    font-weight: 600;
  }
  
  .promo-description {
    font-size: 13px;
    color: white;
    margin: 6px 0 10px;
  }
  
  .promo-button {
    display: inline-block;
    background: #0078d4;
    color: white;
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.2s ease;
  }
  
  .promo-button:hover {
    background: #005a9e;
  }
  </style>
  