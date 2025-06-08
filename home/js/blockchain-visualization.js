// Interactive blockchain transaction visualization
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the container exists and WebGL is supported
    const container = document.getElementById('blockchain-visualization');
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
    camera.position.z = 12;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create blockchain block class
    class Block {
        constructor(index, position, color = 0x3a86ff) {
            // Create block geometry and material
            this.geometry = new THREE.BoxGeometry(2, 1, 0.5);
            this.material = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.85,
                shininess: 30
            });
            
            // Create mesh and set position
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.mesh.position.copy(position);
            
            // Add block index text
            this.addBlockText(index);
            
            // Add to scene
            scene.add(this.mesh);
            
            // Store original color for hover effect
            this.originalColor = color;
        }
        
        addBlockText(index) {
            // Create canvas for text
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 64;
            
            // Set canvas background transparent
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw text
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('#' + index, canvas.width / 2, canvas.height / 2);
            
            // Create texture and sprite
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ 
                map: texture,
                transparent: true,
                opacity: 1
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(1.5, 0.75, 1);
            sprite.position.set(0, 0, 0.3);
            
            // Add text sprite to block
            this.mesh.add(sprite);
        }
        
        highlight() {
            gsap.to(this.material.color, {
                r: 1,
                g: 0.5,
                b: 0,
                duration: 0.3
            });
        }
        
        unhighlight() {
            const originalColor = new THREE.Color(this.originalColor);
            gsap.to(this.material.color, {
                r: originalColor.r,
                g: originalColor.g,
                b: originalColor.b,
                duration: 0.3
            });
        }
    }
    
    // Create transaction line class
    class TransactionLine {
        constructor(startPoint, endPoint, delay = 0) {
            // Create line geometry
            const points = [startPoint, endPoint];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            
            // Create line material
            this.material = new THREE.LineBasicMaterial({
                color: 0x8338ec,
                transparent: true,
                opacity: 0,
                linewidth: 2
            });
            
            // Create line mesh
            this.line = new THREE.Line(geometry, this.material);
            scene.add(this.line);
            
            // Transaction particle
            const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0
            });
            
            this.particle = new THREE.Mesh(particleGeometry, particleMaterial);
            scene.add(this.particle);
            
            // Animation timeline for transaction
            const duration = 1.5;
            
            // Animation sequence
            setTimeout(() => {
                // Fade in the line
                gsap.to(this.material, {
                    opacity: 1,
                    duration: 0.5
                });
                
                // Show and move the particle along the line
                gsap.to(this.particle.material, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5
                });
                
                gsap.to(this.particle.position, {
                    x: endPoint.x,
                    y: endPoint.y,
                    z: endPoint.z,
                    duration: duration,
                    delay: 0.5,
                    ease: "power1.inOut"
                });
                
                // Fade out particle after reaching destination
                gsap.to(this.particle.material, {
                    opacity: 0,
                    duration: 0.5,
                    delay: duration + 0.5
                });
            }, delay);
            
            // Set initial particle position
            this.particle.position.copy(startPoint);
        }
    }
    
    // Create wallet class
    class Wallet {
        constructor(position, color = 0xff006e) {
            // Create wallet geometry and material
            this.geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32);
            this.material = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.85,
                shininess: 50
            });
            
            // Create mesh and set position
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.mesh.position.copy(position);
            this.mesh.rotation.x = Math.PI / 2;
            
            // Add to scene
            scene.add(this.mesh);
            
            // Store original color for hover effect
            this.originalColor = color;
        }
        
        highlight() {
            gsap.to(this.material.color, {
                r: 1,
                g: 1,
                b: 0,
                duration: 0.3
            });
        }
        
        unhighlight() {
            const originalColor = new THREE.Color(this.originalColor);
            gsap.to(this.material.color, {
                r: originalColor.r,
                g: originalColor.g,
                b: originalColor.b,
                duration: 0.3
            });
        }
    }
    
    // Create scene objects
    const blocks = [];
    const wallets = [];
    
    // Create blockchain blocks (positioned in a curve)
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 0.5;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        blocks.push(new Block(i + 1, new THREE.Vector3(x, 0, z)));
    }
    
    // Create wallets (positioned as approvers)
    const walletPositions = [
        new THREE.Vector3(-4, 3, 3),
        new THREE.Vector3(-2, 4, 2),
        new THREE.Vector3(0, 5, 1)
    ];
    
    walletPositions.forEach((position, index) => {
        wallets.push(new Wallet(position, index === 0 ? 0x38b000 : 0xff006e));
    });
    
    // Create multi-sig contract (in center)
    const contractGeometry = new THREE.DodecahedronGeometry(1.2);
    const contractMaterial = new THREE.MeshPhongMaterial({
        color: 0x8338ec,
        transparent: true,
        opacity: 0.85,
        shininess: 80
    });
    
    const contract = new THREE.Mesh(contractGeometry, contractMaterial);
    contract.position.set(0, 0, 0);
    scene.add(contract);
    
    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Animation for contract (floating and rotating)
    gsap.to(contract.position, {
        y: 0.5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });
    
    // Simulate the multi-signature process
    function simulateMultiSigTransaction() {
        // Reset blocks
        blocks.forEach(block => block.unhighlight());
        
        // Highlight latest block
        blocks[blocks.length - 1].highlight();
        
        // Transaction from wallets to contract (signatures)
        walletPositions.forEach((position, index) => {
            // Highlight the wallet
            wallets[index].highlight();
            
            // Create transaction line from wallet to contract
            new TransactionLine(
                position,
                new THREE.Vector3(0, 0, 0),
                index * 1500
            );
            
            // Unhighlight wallet after a delay
            setTimeout(() => {
                wallets[index].unhighlight();
            }, 1500 * (index + 1));
        });
        
        // Once all signatures are collected, create transaction from contract to blockchain
        setTimeout(() => {
            // Highlight the contract
            gsap.to(contractMaterial.color, {
                r: 1,
                g: 1,
                b: 0,
                duration: 0.5
            });
            
            // Create transaction line to the latest block
            const lastBlock = blocks[blocks.length - 1];
            new TransactionLine(
                new THREE.Vector3(0, 0, 0),
                lastBlock.mesh.position,
                500
            );
            
            // Reset contract color
            setTimeout(() => {
                const originalColor = new THREE.Color(0x8338ec);
                gsap.to(contractMaterial.color, {
                    r: originalColor.r,
                    g: originalColor.g,
                    b: originalColor.b,
                    duration: 0.5
                });
                
                // Add new block after transaction is confirmed
                setTimeout(() => {
                    const lastPosition = lastBlock.mesh.position;
                    const angle = ((blocks.length) / 5) * Math.PI * 0.5;
                    const radius = 5;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    
                    // Create new block with a different color
                    blocks.push(new Block(blocks.length + 1, new THREE.Vector3(x, 0, z), 0x38b000));
                    
                    // Reset after a while
                    setTimeout(() => {
                        blocks[blocks.length - 1].unhighlight();
                    }, 2000);
                }, 2000);
            }, 3000);
        }, 5000);
    }
    
    // Start simulation after a delay
    setTimeout(simulateMultiSigTransaction, 1000);
    
    // Repeat simulation every 15 seconds
    setInterval(simulateMultiSigTransaction, 15000);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate all scene objects slightly for better 3D appearance
        contract.rotation.y += 0.01;
        contract.rotation.z += 0.005;
        
        blocks.forEach(block => {
            block.mesh.rotation.y += 0.003;
        });
        
        wallets.forEach(wallet => {
            wallet.mesh.rotation.z += 0.01;
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
    
    // Add interactivity
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };
    
    container.addEventListener('mousedown', (event) => {
        isDragging = true;
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    container.addEventListener('mousemove', (event) => {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        
        if (isDragging) {
            // Rotate scene based on mouse movement
            scene.rotation.y += deltaMove.x * 0.005;
            scene.rotation.x += deltaMove.y * 0.005;
        }
        
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });
});