// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('active');
    });
  }
});

// Gradient animation
class Gradient {
  constructor() {
    this.canvas = document.getElementById('gradient-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.points = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.init();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Create more points for a richer animation
    for (let i = 0; i < 6; i++) {
      this.points.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 6.0,
        vy: (Math.random() - 0.5) * 6.0,
        radius: Math.random() * 300 + 200
      });
    }

    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update points
    this.points.forEach(point => {
      point.x += point.vx;
      point.y += point.vy;

      // Bounce off edges with padding
      if (point.x < -100 || point.x > this.width + 100) point.vx *= -1;
      if (point.y < -100 || point.y > this.height + 100) point.vy *= -1;
    });

    // Create multiple overlapping gradients
    this.points.forEach((point, index) => {
      const gradient = this.ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, point.radius
      );

      // Create different color combinations for each point
      const colors = [
        ['#003B5C', '#0077b6', '#003B5C'],
        ['#0077b6', '#003B5C', '#0077b6'],
        ['#003B5C', '#0077b6', '#003B5C'],
        ['#0077b6', '#003B5C', '#0077b6'],
        ['#003B5C', '#0077b6', '#003B5C'],
        ['#0077b6', '#003B5C', '#0077b6']
      ];

      gradient.addColorStop(0, colors[index][0]);
      gradient.addColorStop(0.5, colors[index][1]);
      gradient.addColorStop(1, colors[index][2]);

      this.ctx.globalAlpha = 0.3;
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    });

    this.ctx.globalAlpha = 1.0;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize gradient when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const gradient = new Gradient();
});

// Tawk.to chat integration
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/681e0c3d9b96651916dbab23/1iqqlvk5k';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})(); 