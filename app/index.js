/**
 * Application entry point
 */

// Load application styles
import 'bulma'
import 'animate.css'
import '@mdi/font/css/materialdesignicons.css'
import 'styles/index.scss'
import wall1Src from '../assets/images/wall1.png'
import wall2Src from '../assets/images/wall2.png'
import wall3Src from '../assets/images/wall3.png'
import wall4Src from '../assets/images/wall4.png'
// ================================
// START YOUR APP HERE
// ================================

const isMobile = window.innerWidth <= 768
console.log(isMobile)
if(!isMobile) {
    // 1. create wall element
    const wall1 = document.createElement('IMG')
    const wall2 = document.createElement('IMG')
    const wall3 = document.createElement('IMG')
    const wall4 = document.createElement('IMG') //classList.add
    const walls = [wall1, wall2, wall3, wall4]
    wall1.classList.add("wall", "wall1", "is-hidden-mobile")
    wall2.classList.add("wall", "wall2", "is-hidden-mobile")
    wall3.classList.add("wall", "wall3", "is-hidden-mobile")
    wall4.classList.add("wall", "wall4", "is-hidden-mobile")
    wall1.setAttribute('src', wall1Src)
    wall2.setAttribute('src', wall2Src)
    wall3.setAttribute('src', wall3Src)
    wall4.setAttribute('src', wall4Src)
    const wallParent = document.querySelector('.home > section')
    walls.forEach(w => wallParent.appendChild(w))

    function wallMove() {
        walls.forEach(w => {
            const r = Math.random() * 80
            w.style['transform'] = `translate(0, ${r}px)`
        })
    }
    setTimeout(wallMove)
    setInterval(wallMove, 10000)
}

document.querySelector('a.follow').addEventListener('click', ()=>{
    document.querySelector('a.follow ~ figure img').style['opacity'] = 1
})

document.querySelectorAll('.navs .tabs ul li a').forEach((link) => {
    link.addEventListener('click', () => {
        alert('在做了')
    })
})
