/**
 * Application entry point
 */

// Load application styles
import 'styles/common.scss'
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
if(!isMobile) {
    // 1. create wall element
    const wall1 = document.createElement('IMG')
    const wall2 = document.createElement('IMG')
    const wall3 = document.createElement('IMG')
    const wall4 = document.createElement('IMG')
    const walls = [wall1, wall2, wall3, wall4]
    wall1.classList.add("wall", "wall1", "is-hidden-mobile")
    wall2.classList.add("wall", "wall2", "is-hidden-mobile")
    wall3.classList.add("wall", "wall3", "is-hidden-mobile")
    wall4.classList.add("wall", "wall4", "is-hidden-mobile")
    wall1.setAttribute('src', wall1Src)
    wall2.setAttribute('src', wall2Src)
    wall3.setAttribute('src', wall3Src)
    wall4.setAttribute('src', wall4Src)
    // const wallParent = document.querySelector('.home > section')
    const wallParent = document.querySelector('body')
    walls.forEach(w => wallParent.appendChild(w))
    const viewHeight = document.documentElement.clientHeight
    walls.forEach(w => {
        w.addEventListener('load', () => {
            if (w.naturalHeight < viewHeight) {
                w.classList.add('bottombase')
            } else {
                w.classList.add('topbase')
            }
        })
    })
    function wallMove() {
        walls.forEach(w => {
            const r = Math.random() * 80
            w.style['transform'] = `translate(0, ${r}px)`
        })
    }
    setTimeout(wallMove)
    setInterval(wallMove, 10000)
}

// document.querySelector('a.follow').addEventListener('click', ()=>{
//     document.querySelector('a.follow ~ figure img').style['opacity'] = 1
// })
const qr = document.querySelector('.qrmodal')
document.querySelectorAll('.modal-close, .modal-background', qr).forEach(e => {
    e.addEventListener('click', () => {
        qr.classList.toggle("is-active");
    })
})
document.querySelector('a.follow').addEventListener('click', () => {
    qr.classList.toggle("is-active");
})
