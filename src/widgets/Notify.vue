<template>
    <div class="notifications">
      <h3>Notificaciones recientes</h3>
      <div v-if="notifications.length === 0" class="no-notifications">
        No hay notificaciones.
      </div>
      <ul v-else>
        <li v-for="(note, index) in notifications" :key="note.id" class="notification">
          <div class="note-content">
            <strong>{{ note.title }}</strong>
            <p>{{ note.message }}</p>
            <span class="note-date">{{ note.date }}</span>
          </div>
          <button class="close-btn" @click="dismiss(index)">×</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [
          {
            id: 1,
            title: "Cambio de contraseña",
            message: "Tu contraseña fue actualizada el 28 de abril a las 16:34.",
            date: "28/04/2025",
          },
          {
            id: 2,
            title: "Número de recuperación actualizado",
            message: "El número de recuperación fue modificado correctamente.",
            date: "27/04/2025",
          },
          {
            id: 3,
            title: "Sesión iniciada",
            message: "Inicio de sesión desde un nuevo dispositivo (Windows 11).",
            date: "26/04/2025",
          },
        ],
      };
    },
    methods: {
      dismiss(index) {
        this.notifications.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .notifications {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background: #f8f9fb;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .notifications h3 {
    margin-bottom: 16px;
    font-size: 20px;
    color: #333;
  }
  
  .no-notifications {
    text-align: center;
    color: #999;
    font-style: italic;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .notification {
    display: flex;
    justify-content: space-between;
    align-items: start;
    background: white;
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 8px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .note-content {
    max-width: 90%;
  }
  
  .note-content strong {
    font-size: 16px;
    color: #222;
  }
  
  .note-content p {
    margin: 4px 0;
    color: #444;
  }
  
  .note-date {
    font-size: 12px;
    color: #888;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #888;
    font-size: 18px;
    cursor: pointer;
    padding: 0 8px;
  }
  
  .close-btn:hover {
    color: #e63946;
  }
  </style>
  