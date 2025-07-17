// Three.js WebGL background for full page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene only if WebGL is supported
    if (!document.getElementById('hero-background')) return;
    
    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
        console.warn('WebGL not supported. Using fallback background.');
        return;
    }

    // Scene setup
    const container = document.getElementById('hero-background');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    // Use a lower pixel ratio for better performance on full-page background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create particle system to represent blockchain nodes
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    // Create random positions for particles
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Create a sphere-like distribution
        const radius = 15 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);     // x
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        posArray[i + 2] = radius * Math.cos(phi);                  // z
        
        scales[i/3] = Math.random() * 0.5 + 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    // Create particles material
    const particlesMaterial = new THREE.PointsMaterial({ 
        color: 0x3a86ff,
        size: 0.2,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Create connections between particles (lines)
    const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3a86ff, 
        transparent: true, 
        opacity: 0.2 
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    // Connect particles that are close to each other
    const positions = particlesGeometry.attributes.position.array;
    const threshold = 6;  // Distance threshold for connecting particles
    
    for (let i = 0; i < positions.length; i += 3) {
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];
        
        for (let j = i + 3; j < positions.length; j += 3) {
            const x2 = positions[j];
            const y2 = positions[j + 1];
            const z2 = positions[j + 2];
            
            const distance = Math.sqrt(
                Math.pow(x2 - x1, 2) + 
                Math.pow(y2 - y1, 2) + 
                Math.pow(z2 - z1, 2)
            );
            
            // Only connect if particles are close enough
            if (distance < threshold) {
                linePositions.push(x1, y1, z1);
                linePositions.push(x2, y2, z2);
            }
        }
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    
    // Add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particleSystem.rotation.y += 0.0015;
        particleSystem.rotation.x += 0.0005;
        lines.rotation.y += 0.0015;
        lines.rotation.x += 0.0005;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Handle window resizing
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation loop
    animate();
    
    // Add mouse and scroll interaction for full-page effect
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    
    // Track mouse movement for parallax effect
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        
        // Subtle camera movement based on mouse position
        if (typeof gsap !== 'undefined') {
            gsap.to(camera.position, 2, {
                x: mouseX * 3,
                y: -mouseY * 3,
                ease: "power1.easeOut"
            });
        } else {
            // Fallback if GSAP is not available
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
        }
    });
    
    // Add subtle effect when scrolling
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        
        // Adjust particle system based on scroll position
        particleSystem.rotation.x = scrollY * 0.0001;
        lines.rotation.x = scrollY * 0.0001;
    });
});