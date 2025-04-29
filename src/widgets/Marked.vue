<template>
  <div class="bookmark-container">
    <!-- Barra de Marcadores -->
    <div class="bookmark-header">
      <h2>Mis Marcadores</h2>
      <button class="add-bookmark-btn" @click="toggleAddBookmarkModal">+ Agregar Marcador</button>
    </div>

    <div class="bookmark-bar">
      <div v-for="bookmark in bookmarks" :key="bookmark.id" class="bookmark-item">
        <div class="bookmark-icon-container">
          <img :src="bookmark.icon" alt="icon" class="bookmark-icon">
        </div>
        <div class="bookmark-info">
          <span class="bookmark-name">{{ bookmark.name }}</span>
        </div>
      </div>
    </div>

    <!-- Modal para agregar un nuevo marcador -->
    <div v-if="isAddModalVisible" class="modal">
      <div class="modal-content">
        <h3>Nuevo Marcador</h3>
        <input v-model="newBookmarkName" placeholder="Nombre del marcador" class="modal-input" />
        <input v-model="newBookmarkIcon" placeholder="URL del ícono" class="modal-input" />
        <button @click="addBookmark" class="modal-btn">Agregar</button>
        <button @click="toggleAddBookmarkModal" class="modal-btn cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAddModalVisible: false, // Controlar si el modal de agregar marcador está visible
      newBookmarkName: '', // Nombre del marcador
      newBookmarkIcon: '', // URL del ícono del marcador
      bookmarks: [
        { id: 1, name: 'Facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png' },
        { id: 2, name: 'Twitter', icon: 'https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_2021.svg' },
        { id: 3, name: 'GitHub', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Octicons-mark-github.svg' }
      ]
    };
  },
  methods: {
    // Agregar un marcador
    addBookmark() {
      if (this.newBookmarkName && this.newBookmarkIcon) {
        const newId = this.bookmarks.length + 1;
        this.bookmarks.push({
          id: newId,
          name: this.newBookmarkName,
          icon: this.newBookmarkIcon
        });
        this.newBookmarkName = '';
        this.newBookmarkIcon = '';
        this.toggleAddBookmarkModal();
      }
    },
    // Eliminar un marcador
    removeBookmark(id) {
      this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    },
    // Toggle para abrir y cerrar el modal de agregar marcador
    toggleAddBookmarkModal() {
      this.isAddModalVisible = !this.isAddModalVisible;
    }
  }
};
</script>

<style scoped>
.bookmark-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
}

.bookmark-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  align-items: center;
}

.bookmark-header h2 {
  font-size: 24px;
  color: #333;
}

.add-bookmark-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.add-bookmark-btn:hover {
  background-color: #45a049;
}

.bookmark-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

.bookmark-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
  transition: transform 0.2s;
}

.bookmark-item:hover {
  transform: scale(1.05);
}

.bookmark-icon-container {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.bookmark-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.bookmark-info {
  font-size: 14px;
  color: #333;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #c0392b;
}

/* Estilos del modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-btn {
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.modal-btn.cancel {
  background-color: #e74c3c;
}

.modal-btn:hover {
  background-color: #2980b9;
}
</style>

