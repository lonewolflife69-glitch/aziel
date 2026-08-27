/**
 * ===================================================================
 * PAUL'S PROCEDURAL ROSE BLOOM CANVAS 2D ENGINE
 * ===================================================================
 * Procedural growth of stems, thorn details, layered deep red Rose petals,
 * glowing pollen particles, floating wind petals, and depth parallax.
 * Designed for 60fps performance on Mobile & Desktop.
 * ===================================================================
 */

class RoseEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Engine States: 'intro', 'blooming', 'framed', 'ambient', 'finale'
    this.state = 'intro';
    this.progress = 0; // 0 to 1 for intro bloom
    this.time = 0;

    // Entities
    this.particles = [];
    this.floatingPetals = [];
    this.flowers = [];
    this.stems = [];

    // Settings & Performance tuning
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Create initial dust particles & floating rose petals
    this.createDustParticles();
    this.createFloatingPetals();

    // Start loop
    requestAnimationFrame((t) => this.loop(t));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createDustParticles() {
    const count = this.width < 768 ? 50 : 90;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  createFloatingPetals() {
    const count = this.width < 768 ? 30 : 55;
    this.floatingPetals = [];
    for (let i = 0; i < count; i++) {
      this.floatingPetals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 16 + 10,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * 0.9 + 0.5,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.45 + 0.45,
        colorType: Math.floor(Math.random() * 3)
      });
    }
  }

  startBloomAnimation(onFrameReady) {
    this.state = 'blooming';
    this.progress = 0;
    this.onFrameReady = onFrameReady;

    // Generate procedural garden branching outward from exact center (width/2, height/2)
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.stems = [];
    this.flowers = [];

    // Flowing petals burst outward 360 degrees from exact center
    this.floatingPetals = [];
    const outwardPetalCount = this.width < 768 ? 45 : 80;
    for (let i = 0; i < outwardPetalCount; i++) {
      const burstAngle = (i / outwardPetalCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 3.8 + 1.8;
      this.floatingPetals.push({
        x: centerX,
        y: centerY,
        size: Math.random() * 16 + 10,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        vx: Math.cos(burstAngle) * speed,
        vy: Math.sin(burstAngle) * speed,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.55 + 0.45,
        colorType: Math.floor(Math.random() * 3)
      });
    }

    const isMobile = this.width < 768;
    const numStems = isMobile ? 8 : 14;

    for (let i = 0; i < numStems; i++) {
      const angle = (i / numStems) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const length = Math.min(this.width, this.height) * (0.38 + Math.random() * 0.22);
      
      // Control points for organic curving stem
      const cp1x = centerX + Math.cos(angle - 0.2) * (length * 0.4);
      const cp1y = centerY + Math.sin(angle - 0.2) * (length * 0.4);
      const cp2x = centerX + Math.cos(angle + 0.2) * (length * 0.7);
      const cp2y = centerY + Math.sin(angle + 0.2) * (length * 0.7);
      const targetX = centerX + Math.cos(angle) * length;
      const targetY = centerY + Math.sin(angle) * length;

      const stemDelay = (i / numStems) * 0.45;
      const stemDuration = 0.6;

      this.stems.push({
        startX: centerX,
        startY: centerY,
        cp1x, cp1y, cp2x, cp2y,
        targetX, targetY,
        angle,
        length,
        delay: stemDelay,
        duration: stemDuration,
        width: 3.5 - (i % 3) * 0.5
      });

      // Place Roses along each stem trajectory
      const bloomScale = 0.7 + Math.random() * 0.5;
      this.flowers.push({
        x: targetX,
        y: targetY,
        angle: angle + Math.PI / 2,
        scale: bloomScale,
        delay: stemDelay + 0.25,
        bloomProgress: 0,
        petals: 12,
        colorTint: i % 2 === 0 ? '#e63946' : '#d62828'
      });

      // Additional smaller rose blossom along mid-stem
      if (Math.random() > 0.4) {
        const midX = (centerX + targetX) * 0.5 + (Math.random() - 0.5) * 40;
        const midY = (centerY + targetY) * 0.5 + (Math.random() - 0.5) * 40;
        this.flowers.push({
          x: midX,
          y: midY,
          angle: angle + (Math.random() - 0.5),
          scale: bloomScale * 0.65,
          delay: stemDelay + 0.15,
          bloomProgress: 0,
          petals: 10,
          colorTint: '#b7094c'
        });
      }
    }
  }

  startFinaleSurprise() {
    this.state = 'finale';
    this.progress = 0;

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.flowers = [{
      x: centerX,
      y: centerY,
      angle: 0,
      scale: 1.6,
      delay: 0,
      bloomProgress: 0,
      petals: 16,
      colorTint: '#e63946'
    }];

    // Generate burst of 100+ rose petals and particles outward from center
    this.floatingPetals = [];
    const petalCount = this.width < 768 ? 60 : 120;
    for (let i = 0; i < petalCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.floatingPetals.push({
        x: centerX,
        y: centerY,
        size: Math.random() * 14 + 6,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: Math.random() * 0.8 + 0.2,
        wobble: Math.random() * Math.PI * 2
      });
    }
  }

  loop(timestamp) {
    this.time = timestamp * 0.001;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Dust & Pollen Particles
    this.updateAndDrawParticles();

    // 2. State specific rendering
    if (this.state === 'intro') {
      this.drawCentralGlowingPoint();
    } else if (this.state === 'blooming' || this.state === 'framed') {
      // 5 second bloom growth duration (1 / (60fps * 5s) = 0.00333)
      this.progress = Math.min(this.progress + 0.00333, 1);
      
      this.drawStemsAndFlowers();
      this.updateAndDrawFloatingPetals();

      if (this.progress >= 0.98 && this.state === 'blooming') {
        this.state = 'framed';
        if (this.onFrameReady) this.onFrameReady();
      }
    } else if (this.state === 'ambient') {
      this.updateAndDrawFloatingPetals();
    } else if (this.state === 'finale') {
      this.progress = Math.min(this.progress + 0.008, 1);
      this.drawStemsAndFlowers();
      this.updateAndDrawFinaleBurst();
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  drawCentralGlowingPoint() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const pulse = Math.sin(this.time * 2) * 4 + 12;

    const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse * 4);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.3, 'rgba(230, 57, 70, 0.7)');
    grad.addColorStop(0.7, 'rgba(255, 154, 162, 0.3)');
    grad.addColorStop(1, 'rgba(255, 240, 243, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, pulse * 4, 0, Math.PI * 2);
    this.ctx.fill();

    // Core point
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawStemsAndFlowers() {
    const breeze = Math.sin(this.time * 1.5) * 4;

    // Draw Stems
    for (let stem of this.stems) {
      const stemProg = Math.max(0, Math.min(1, (this.progress - stem.delay) / stem.duration));
      if (stemProg <= 0) continue;

      this.ctx.save();
      this.ctx.strokeStyle = '#2d5a27'; // Deep lush rose green stem
      this.ctx.lineWidth = stem.width;
      this.ctx.lineCap = 'round';
      this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
      this.ctx.shadowBlur = 8;

      this.ctx.beginPath();
      this.ctx.moveTo(stem.startX, stem.startY);
      
      // Interpolate bezier curve based on growth progress
      const currCp1x = stem.startX + (stem.cp1x - stem.startX) * stemProg;
      const currCp1y = stem.startY + (stem.cp1y - stem.startY) * stemProg;
      const currTargetX = stem.startX + (stem.targetX - stem.startX) * stemProg + breeze * stemProg;
      const currTargetY = stem.startY + (stem.targetY - stem.startY) * stemProg;

      this.ctx.quadraticCurveTo(currCp1x, currCp1y, currTargetX, currTargetY);
      this.ctx.stroke();

      // Draw leaves and rose thorns unfolding along stem
      if (stemProg > 0.4) {
        const leafProg = (stemProg - 0.4) / 0.6;
        const leafX = stem.startX + (stem.cp1x - stem.startX) * 0.6;
        const leafY = stem.startY + (stem.cp1y - stem.startY) * 0.6;
        this.drawLeaf(leafX, leafY, stem.angle + 0.8, leafProg * 18);
        this.drawLeaf(leafX, leafY, stem.angle - 0.8, leafProg * 14);
      }

      this.ctx.restore();
    }

    // Draw Blooming Roses
    for (let flower of this.flowers) {
      const bloomProg = Math.max(0, Math.min(1, (this.progress - flower.delay) / 0.4));
      if (bloomProg <= 0) continue;

      this.drawRoseBlossom(
        flower.x + breeze * 0.5,
        flower.y,
        flower.angle,
        flower.scale,
        bloomProg,
        flower.colorTint
      );
    }
  }

  drawLeaf(x, y, angle, size) {
    if (size <= 0) return;
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.fillStyle = '#1e3f20';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.quadraticCurveTo(size * 0.5, -size * 0.35, size, 0);
    this.ctx.quadraticCurveTo(size * 0.5, size * 0.35, 0, 0);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawRoseBlossom(x, y, angle, scale, bloomProg, colorTint) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle + Math.sin(this.time + x) * 0.05);

    const baseRadius = 48 * scale * bloomProg;

    // Subtle drop shadow for depth
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    this.ctx.shadowBlur = 12 * scale;

    // Multi-layered Rose Petals (3 concentric spiral layers for realistic rose bloom)
    const layers = [
      { count: 5, rScale: 1.0, widthScale: 0.75, opacity: 0.95 }, // Outer guard petals
      { count: 5, rScale: 0.72, widthScale: 0.65, opacity: 0.98 }, // Mid petals
      { count: 4, rScale: 0.45, widthScale: 0.55, opacity: 1.0 }   // Inner tight bud
    ];

    layers.forEach((layer, layerIdx) => {
      const angleStep = (Math.PI * 2) / layer.count;
      const offset = (layerIdx * Math.PI) / 5;

      for (let i = 0; i < layer.count; i++) {
        const petalAngle = i * angleStep + offset;
        const currentR = baseRadius * layer.rScale;

        this.ctx.save();
        this.ctx.rotate(petalAngle);

        // Rose Petal Gradient: Dark velvety crimson base to vibrant red petal tips
        const grad = this.ctx.createLinearGradient(0, 0, 0, -currentR);
        if (layerIdx === 0) {
          grad.addColorStop(0, '#590d22'); // Deep wine base
          grad.addColorStop(0.5, colorTint);
          grad.addColorStop(1, '#ff4d6d'); // Radiant crimson tip
        } else if (layerIdx === 1) {
          grad.addColorStop(0, '#800f2f');
          grad.addColorStop(0.6, '#c9184a');
          grad.addColorStop(1, '#ff758f');
        } else {
          grad.addColorStop(0, '#a4133c');
          grad.addColorStop(1, '#ff8fa3');
        }

        this.ctx.fillStyle = grad;
        this.ctx.strokeStyle = 'rgba(255, 179, 198, 0.3)';
        this.ctx.lineWidth = 1;

        // Draw rounded velvety rose petal cup
        const petalWidth = currentR * layer.widthScale;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(-petalWidth, -currentR * 0.35, -petalWidth * 1.1, -currentR * 0.9, 0, -currentR);
        this.ctx.bezierCurveTo(petalWidth * 1.1, -currentR * 0.9, petalWidth, -currentR * 0.35, 0, 0);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
      }
    });

    // Golden Rose Center Stamen Core
    if (bloomProg > 0.5) {
      const centerR = baseRadius * 0.2 * bloomProg;
      const gradCenter = this.ctx.createRadialGradient(0, 0, 0, 0, 0, centerR);
      gradCenter.addColorStop(0, '#ffb703');
      gradCenter.addColorStop(0.7, '#fb8500');
      gradCenter.addColorStop(1, '#780000');

      this.ctx.fillStyle = gradCenter;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, centerR, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  updateAndDrawParticles() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      p.alpha += Math.sin(this.time * p.pulseSpeed * 100) * 0.008;
      const currentAlpha = Math.max(0.2, Math.min(0.85, p.alpha));

      this.ctx.fillStyle = `rgba(230, 57, 70, ${currentAlpha})`;
      this.ctx.shadowColor = 'rgba(255, 92, 138, 0.6)';
      this.ctx.shadowBlur = 6;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.shadowBlur = 0; // Reset shadow
  }

  updateAndDrawFloatingPetals() {
    for (let petal of this.floatingPetals) {
      petal.x += petal.vx + Math.sin(petal.wobble) * 0.6;
      petal.y += petal.vy;
      petal.angle += petal.rotationSpeed;
      petal.wobble += petal.wobbleSpeed;

      if (petal.y > this.height + 30) {
        petal.y = -30;
        petal.x = Math.random() * this.width;
      }
      if (petal.x < -30) petal.x = this.width + 30;
      if (petal.x > this.width + 30) petal.x = -30;

      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.angle);

      // Single floating rose petal shape with vibrant crimson gradient
      const grad = this.ctx.createLinearGradient(0, 0, 0, -petal.size);
      if (petal.colorType === 0) {
        grad.addColorStop(0, `rgba(230, 57, 70, ${petal.opacity})`);
        grad.addColorStop(1, `rgba(255, 117, 143, ${petal.opacity * 0.8})`);
      } else if (petal.colorType === 1) {
        grad.addColorStop(0, `rgba(201, 24, 74, ${petal.opacity})`);
        grad.addColorStop(1, `rgba(255, 77, 109, ${petal.opacity * 0.8})`);
      } else {
        grad.addColorStop(0, `rgba(164, 19, 60, ${petal.opacity})`);
        grad.addColorStop(1, `rgba(255, 143, 163, ${petal.opacity * 0.95})`);
      }

      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = 'rgba(230, 57, 70, 0.35)';
      this.ctx.shadowBlur = 8;

      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, petal.size * 0.5, petal.size * 0.8, Math.PI / 6, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  updateAndDrawFinaleBurst() {
    for (let petal of this.floatingPetals) {
      petal.x += petal.vx;
      petal.y += petal.vy;
      petal.vx *= 0.985;
      petal.vy *= 0.985;
      petal.vy += 0.05; // gentle gravity drop
      petal.angle += petal.rotationSpeed;

      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.angle);

      const grad = this.ctx.createLinearGradient(0, 0, 0, -petal.size);
      grad.addColorStop(0, `rgba(230, 57, 70, ${petal.opacity})`);
      grad.addColorStop(1, `rgba(255, 204, 213, ${petal.opacity})`);

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, petal.size * 0.45, petal.size * 0.75, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }
}

// Export for script.js
window.RoseEngine = RoseEngine;
