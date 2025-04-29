<template>
  <div class="clock-container">
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  name: 'AnalogClock',
  data() {
    return {
      ctx: null, // Contexto del canvas
      radius: 150, // Radio del reloj
      intervalId: null, // Para almacenar el ID del intervalo
      romanNumbers: ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'], // Números romanos en orden correcto
    };
  },
  mounted() {
    // Inicializar el canvas
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.translate(this.radius, this.radius); // Mover el origen al centro
    this.startClock();
  },
  methods: {
    drawClock() {
      const ctx = this.ctx;
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      ctx.clearRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2); // Limpiar el canvas

      // Dibujar la cara del reloj
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#333';
      ctx.stroke();

      // Dibujar los números romanos en lugar de los números árabes
      ctx.font = '18px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Empezamos con el XII en la parte superior
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180; // Ajustamos el ángulo para que el XII esté arriba
        const x = (this.radius - 30) * Math.cos(angle);
        const y = (this.radius - 30) * Math.sin(angle);
        ctx.fillText(this.romanNumbers[i], x, y);
      }

      // Cálculo de las manecillas
      const hourAngle = ((hour % 12) + minute / 60) * 30 * Math.PI / 180 - Math.PI / 2; // Ajuste de la manecilla de la hora
      const minuteAngle = (minute + second / 60) * 6 * Math.PI / 180 - Math.PI / 2; // Manecilla de los minutos
      const secondAngle = second * 6 * Math.PI / 180 - Math.PI / 2; // Manecilla de los segundos

      // Dibujar las manecillas
      this.drawHand(hourAngle, 50, 8, '#333', 'round');  // Hora
      this.drawHand(minuteAngle, 80, 6, '#666', 'round'); // Minuto
      this.drawHand(secondAngle, 100, 4, '#f00', 'round'); // Segundo
    },
    
    // Función para dibujar las manecillas con bordes redondeados
    drawHand(angle, length, width, color, lineCap) {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(length * Math.cos(angle), length * Math.sin(angle));
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.lineCap = lineCap; // Redondear los bordes de las manecillas
      ctx.stroke();
    },

    startClock() {
      this.intervalId = setInterval(() => {
        this.drawClock();
      }, 1000);
    },

    stopClock() {
      clearInterval(this.intervalId);
    }
  },
  beforeDestroy() {
    this.stopClock();
  }
};
</script>

<style scoped>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
canvas {
  border: 5px solid #333;
  border-radius: 50%;
}
</style>

