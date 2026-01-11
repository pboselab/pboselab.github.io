/**
 * Interactive Molecular Network Animation
 * Creates a network of floating nodes that connect when close, simulating biological systems.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = window.innerWidth < 768 ? 40 : 80; // Fewer particles on mobile
    const connectionDistance = 150;
    const mouseDistance = 250;

    // Mouse position
    let mouse = { x: null, y: null };

    // Resize handler
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    // Mouse listeners
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction (repel gently)
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 1.5; // Strength
                    const directionY = forceDirectionY * force * 1.5;

                    this.vx -= directionX * 0.05;
                    this.vy -= directionY * 0.05;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Use CSS variable color via getComputedStyle if needed, or hardcode teal theme
            // We'll use a semi-transparent teal for particles
            ctx.fillStyle = getThemeColor();
            ctx.fill();
        }
    }

    function getThemeColor() {
        // Check if dark mode is active
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark ? 'rgba(63, 185, 209, 0.6)' : 'rgba(13, 138, 158, 0.4)';
    }

    function getLineColor(opacity) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDark ? `rgba(63, 185, 209, ${opacity})` : `rgba(13, 138, 158, ${opacity})`;
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = getLineColor(opacity * 0.5); // Softer lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Init
    resize();
    initParticles();
    animate();
});
