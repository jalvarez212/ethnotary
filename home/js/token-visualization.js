// 3D Token Visualization for Feature Section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize only if container exists and WebGL is supported
    const container = document.getElementById('token-visualization');
    if (!container || !window.WebGLRenderingContext) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        60, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
    );
    camera.position.z = 10;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create token models
    const tokens = [];
    const tokenTypes = [
        { 
            geometry: new THREE.CylinderGeometry(2, 2, 0.5, 32), 
            material: new THREE.MeshPhongMaterial({ 
                color: 0x3a86ff,
                transparent: true,
                opacity: 0.9,
                shininess: 100
            }),
            scale: 0.5,
            rotationSpeed: 0.01
        },
        { 
            geometry: new THREE.OctahedronGeometry(1.5), 
            material: new THREE.MeshPhongMaterial({ 
                color: 0x8338ec, 
                transparent: true,
                opacity: 0.9,
                shininess: 80
            }),
            scale: 0.6,
            rotationSpeed: 0.015
        },
        { 
            geometry: new THREE.TorusGeometry(1, 0.5, 16, 50), 
            material: new THREE.MeshPhongMaterial({ 
                color: 0xff006e,
                transparent: true,
                opacity: 0.9,
                shininess: 90
            }),
            scale: 0.7,
            rotationSpeed: 0.008
        }
    ];
    
    // Create tokens and add to scene
    tokenTypes.forEach((tokenType, index) => {
        const token = new THREE.Mesh(tokenType.geometry, tokenType.material);
        token.scale.set(tokenType.scale, tokenType.scale, tokenType.scale);
        
        // Position tokens in different parts of the space
        const angle = (index / tokenTypes.length) * Math.PI * 2;
        const radius = 3;
        token.position.x = Math.cos(angle) * radius;
        token.position.y = Math.sin(angle) * radius;
        token.position.z = index - 1;
        
        token.rotationSpeed = tokenType.rotationSpeed;
        tokens.push(token);
        scene.add(token);
    });
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Add directional light for shadows and highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add point lights for extra dimension
    const pointLight1 = new THREE.PointLight(0x3a86ff, 1, 20);
    pointLight1.position.set(5, -5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff006e, 1, 20);
    pointLight2.position.set(-5, 5, 5);
    scene.add(pointLight2);
    
    // Add a subtle floating animation with GSAP
    tokens.forEach((token, index) => {
        // Create floating animation
        gsap.to(token.position, {
            y: token.position.y + 0.5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
        });
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate tokens
        tokens.forEach(token => {
            token.rotation.x += token.rotationSpeed * 0.5;
            token.rotation.y += token.rotationSpeed;
            token.rotation.z += token.rotationSpeed * 0.3;
        });
        
        renderer.render(scene, camera);
    }
    
    // Handle window resizing
    function onResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    window.addEventListener('resize', onResize);
    
    // Start animation
    animate();
    
    // Add interactivity - rotate on mouse move
    let mouseX = 0;
    let mouseY = 0;
    
    container.addEventListener('mousemove', (event) => {
        // Calculate normalized mouse position
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
        
        // Apply subtle rotation to scene based on mouse position
        gsap.to(scene.rotation, {
            x: mouseY * 0.3,
            y: mouseX * 0.3,
            duration: 1.5,
            ease: "power2.out"
        });
    });
});