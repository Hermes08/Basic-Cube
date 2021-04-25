import './style.css'
import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

console.log(OrbitControls)

/*
Cursor*/
const cursor = {
    x:0,
    y:0,
}
window.addEventListener('mousemove' , (event)=>{
    cursor.x=event.clientX / sizes.width - 0.5;
    cursor.y= - (event.clientY / sizes.height - 0.5)
  
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=>{
   
   //Update sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update render

    renderer.setSize(sizes.width, sizes.height)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2))




})

window.addEventListener('dblclick' , ()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
    
    if(!fullscreenElement){

        if(canvas.requestFullscreen){

            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
} 
else{

        document.exitFullscreen()
        console.log('leave full screen')
    }
})



// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height , 0.1 , 100)

/* Ortographic Camera
const aspectRatio = sizes.width/sizes.height
console.log(aspectRatio)
const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 *aspectRatio,1,-1, 0.1 ,100)*/


//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//Controls 

const controls = new OrbitControls(camera,canvas )

controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio , 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime;

   /* //Update Camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3 ;

    camera.position.z= Math.cos(cursor.x * Math.PI * 2)  * 3;

    camera.position.y= cursor.y * 5 ;

    

    camera.lookAt(mesh.position)
            */

    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
 
tick()