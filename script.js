import * as $ from '//cdn.skypack.dev/three@0.125.0/build/three.module.js?min'
import { OrbitControls } from '//cdn.skypack.dev/three@0.125.0/examples/jsm/controls/OrbitControls.js?min'
import { CSGModeller } from '//cdn.jsdelivr.net/gh/ycw/three-csg-modeller@0.1.10/dist/lib.esm.js'
import { gsap } from '//cdn.skypack.dev/gsap?min'

//// Boot

const renderer = new $.WebGLRenderer({});
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(75, 2, .1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
window.addEventListener('resize', () => {
    const { clientWidth, clientHeight } = renderer.domElement;
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
});
document.body.prepend(renderer.domElement);
window.dispatchEvent(new Event('resize'));

//// Setup

camera.position.set(-0.3, 0.1, 1);
scene.add(new $.AmbientLight('white', 0.1));
const light0 = new $.DirectionalLight('white', 1);
light0.position.set(1, 2, 3);
light0.castShadow = true;
light0.shadow.mapSize.set(1024, 1024);
light0.shadow.camera.far = 10;

scene.add(light0);
renderer.shadowMap.enabled = true;

const tl = new $.TextureLoader();

const tex0 = tl.load('https://images.unsplash.com/photo-1612525198460-9b8872c7cdd0?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3MHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60');
var tex1 = tl.load('https://i.postimg.cc/L4DKHJ8Y/20190527-200206-1.jpg');
const ratio = 1350 / 900;

const modeller = new CSGModeller($);
const static_model = (() => {
    const mat = new $.MeshPhongMaterial({ map: tex0, wireframe: true });
    const models = [];
    for (let i = 0, I = 8; i < I; ++i) {
        const mesh = new $.Mesh(new $.BoxBufferGeometry(5, 5, 0.5), mat);
        mesh.position.z = - i / I * 6;
        models.push(modeller.model(mesh));
    }
    return models.reduce((o, nu) => o.union(nu));
})();

//// Model 1
const mesh1 = (() => {
    const mat = new $.MeshPhongMaterial({ map: tex0 });
    return modeller.model(new $.Mesh(new $.BoxBufferGeometry(1.5, 1.5 / ratio, 100), mat)).build();
})();

//// Mesh - foto
var foto = new $.Mesh(
    new $.BoxBufferGeometry(1, 1 / ratio, 0.05),
    new $.MeshPhongMaterial({ map: tex1 })
);
foto.castShadow = foto.receiveShadow = true;
scene.add(foto);

//// Mesh - holding model's geom and mat
const mesh = static_model.subtract(modeller.model(mesh1)).build();
mesh.receiveShadow = mesh.castShadow = true;
scene.add(mesh);

renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    controls.update();
});

gsap.timeline().from(foto.position, {
    z: -10, duration: 3, ease: 'power4',
    onUpdate() {
        mesh1.position.copy(foto.position);
        mesh.geometry.dispose();
        mesh.geometry = static_model.subtract(modeller.model(mesh1)).build().geometry;
    }
}).from(foto.rotation, { x: 0.5 * Math.PI, duration: 2, ease: 'elastic' }, '-=1');


const loginPopup = document.querySelector(".login-popup");
window.addEventListener("load", function(){
    showPopup();
})

function showPopup(){
    const timeLimit = 5 // seconds;
    let i=0;
    const timer = setInterval(function(){
        i++;
        if(i == timeLimit){
            clearInterval(timer);
            const t2 = new $.TextureLoader();
            var tex2 = t2.load('https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1131&q=80');
            foto = new $.Mesh(
    new $.BoxBufferGeometry(1, 1 / ratio, 0.05),
    new $.MeshPhongMaterial({ map: tex2 })
);
            foto.castShadow = foto.receiveShadow = true;
scene.add(foto);
        }
        console.log(i)
    }, 1000);
}
