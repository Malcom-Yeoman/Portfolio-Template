window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollDistance = document.documentElement.scrollTop;

    if (scrollDistance > 5) { 
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }

    // Effet parallaxe sur la caméra
    const parallaxEffect = scrollDistance * 0.005; // Ajustez cette valeur pour augmenter ou diminuer l'effet
    camera.position.y = 2 - parallaxEffect; 
});

let camera, scene, renderer, particles;

init();
animate();

// Récupérez le bouton HTML par son ID
const myButton = document.getElementById('myButton');

function init() {
    // Créer une scène
    scene = new THREE.Scene();

    // Créer une caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // Ajouter une lumière
    const light = new THREE.PointLight(0xffffff, 0.8);
    camera.add(light);
    scene.add(camera);

    // Créer des particules
    particles = new THREE.Group();
    for (let i = 0; i < 500; i++) {
        const geometry = new THREE.SphereGeometry(0.02);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, flatShading: true });
        const particle = new THREE.Mesh(geometry, material);

        particle.position.x = (Math.random() - 0.5) * 10;
        particle.position.y = (Math.random() - 0.5) * 10;
        particle.position.z = (Math.random() - 0.5) * 10;

        particles.add(particle);
    }
    scene.add(particles);

    // Créer le rendu
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('three-container').appendChild(renderer.domElement);

    // Ajouter un écouteur pour redimensionner la fenêtre
    window.addEventListener('resize', onWindowResize, false);
}

// Positionnez le bouton HTML au-dessus de la scène 3D
function positionButton() {
    const rect = renderer.domElement.getBoundingClientRect();
    const buttonStyle = myButton.style;

    const x = rect.left + (rect.width - myButton.offsetWidth) / 2;
    const y = rect.top + (rect.height - myButton.offsetHeight) / 2;

    buttonStyle.position = 'absolute';
    buttonStyle.left = x + 'px';
    buttonStyle.top = y + 'px';
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Appelez la fonction pour positionner le bouton lors du redimensionnement de la fenêtre
    positionButton();
}

function animate() {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;

    renderer.render(scene, camera);
}