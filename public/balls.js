'use strict';

const myCanvas = document.querySelector('#myCanvas');
const ctx = myCanvas.getContext('2d');

const pong = {
    posX:0,
    posY:0,
    width:160,
    height:20,
    speedX: 0
}

let baelle = [];
let _timer, count = 1, level = 0, start = new Date();

const render = () => {

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);   

    baelle.forEach((el, i, arr) => {

        ctx.beginPath();
        ctx.arc(el.centerX, el.centerY, el.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = el.color;
        ctx.fill();
    
        if(el.centerX + el.radius > myCanvas.width || el.centerX - el.radius < 0) arr[i].speedX *= -1;
        if(el.centerY + el.radius > pong.posY && el.centerY + el.radius < pong.posY + pong.height
            && ((el.centerX - el.radius > pong.posX 
                    && el.centerX - el.radius < pong.posX + pong.width)
                || (el.centerX + el.radius > pong.posX
                    && el.centerX + el.radius < pong.posX + pong.width)
                || (el.centerX - el.radius < pong.posX 
                    && el.centerX + el.radius > pong.posX + pong.width))) arr[i].speedY *= -1;

        for(let j = i + 1; j < arr.length; j++){
            collision(arr[i], arr[j]);
        }
    
        arr[i].centerX += arr[i].speedX;
        arr[i].centerY += arr[i].speedY;  

        if(el.centerY == 0) {
            handicap();
        }
    });

    baelle = baelle.filter(el => el.centerY > 0 && el.centerY < myCanvas.height + el.radius);
    checkLevel();
    if(baelle.length==0) newBall();

    ctx.fillStyle = '#2A3132'
    ctx.fillRect(pong.posX, pong.posY, pong.width, pong.height);

    pong.posX += pong.speedX;

    if(pong.posX == 0){
        pong.speedX = 0;
    }else if(pong.posX == myCanvas.width - pong.width){
        pong.speedX = 0;
    }  
    requestAnimationFrame(render);
}

const handicap = () =>{
    count++;
    let now = new Date();
    const _counter = document.querySelector('#counter');
    _counter.innerText = 'Punke: ' + Math.floor(Math.abs((start.getTime() - now.getTime())/1000)/count);
}

const collision = (a, b) => {
    let dx = (a.centerX + a.radius) - (b.centerX + b.radius);
    let dy = (a.centerY + a.radius) - (b.centerY + b.radius);
    let distance = Math.sqrt(dx * dx + dy * dy);

    if ((distance <= a.radius + b.radius) 
        && ((a.centerX - b.centerX) * (a.centerX - b.centerX) + (a.centerY - b.centerY) * (a.centerY - b.centerY) <= (a.radius + b.radius) * (a.radius + b.radius))) {

        // https://hermann-baum.de/bouncing-balls/
        // https://hermann-baum.de/bouncing-balls/Elastischer_Stoss.pdf
        
        let phi;
        if (a.centerX == b.centerX) {
          phi = b.centerY > a.centerY ? Math.PI/2 : -Math.PI/2;
        } else {
          phi = Math.atan((b.centerY - a.centerY)/(b.centerX - a.centerX));
        }
    
        let sinphi = Math.sin(phi);
        let cosphi = Math.cos(phi);
        let v1xsinphi = a.speedX * sinphi;
        let v1xcosphi = a.speedX * cosphi;
        let v1ysinphi = a.speedY * sinphi;
        let v1ycosphi = a.speedY * cosphi;
        let v2xsinphi = b.speedX * sinphi;
        let v2xcosphi = b.speedX * cosphi;
        let v2ysinphi = b.speedY * sinphi;
        let v2ycosphi = b.speedY * cosphi;
        let v1zaehler = (a.masse - b.masse) * (v1xcosphi + v1ysinphi) + 2 * b.masse * (v2xcosphi + v2ysinphi);
        let v2zaehler = (b.masse - a.masse) * (v2xcosphi + v2ysinphi) + 2 * a.masse * (v1xcosphi + v1ysinphi);
        let msum = a.masse + b.masse;
    
        a.speedX = (v1xsinphi - v1ycosphi) * sinphi + v1zaehler * cosphi / msum;
        a.speedY = (-v1xsinphi + v1ycosphi) * cosphi + v1zaehler * sinphi / msum;
        b.speedX = (v2xsinphi - v2ycosphi) * sinphi + v2zaehler * cosphi / msum;
        b.speedY = (-v2xsinphi + v2ycosphi) * cosphi + v2zaehler * sinphi / msum;

        while ((a.centerX - b.centerX) * (a.centerX - b.centerX) + (a.centerY - b.centerY) * (a.centerY - b.centerY) <= (a.radius + b.radius) * (a.radius + b.radius)) {
            a.centerX += a.speedX * 2;
            a.centerY += a.speedY * 2;
            b.centerX += b.speedX * 2;
            b.centerY += b.speedY * 2;
          }
    }
}

const checkLevel = () =>{
    if(Math.floor(count/10) != level) {
        level = Math.floor(count/10);    
        clearTimeout(_timer);
        _timer = setInterval(function(){ 
            newBall();
        }, 1000/level); 
        console.log('level ' + level);
    }
}

const newBall = () => {
    baelle.push({
        centerX: mllib.createNumber(0, myCanvas.width),
        centerY: 0,
        radius: mllib.createNumber(10, 50),
        color: mllib.createColor(100,50),
        speedX: mllib.createNumber(-3,3),
        speedY: mllib.createNumber(2,6),
        get masse(){
            return 2*Math.PI*this.radius;
        }
    });
}

const handleKeyDown = evt => {

    switch (evt.key) {
        case 'ArrowLeft':
            pong.speedX = -15
            break;
        case 'ArrowRight':
            pong.speedX = 15
            break;
        default:
            break;
    }
}

const handleKeyUp = evt => {

    switch (evt.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            pong.speedX = 0
            break;
        default:
            break;
    }
}

const header = () =>{
    const header = document.querySelector('header');
    dom.create({
        typ: 'p',
        eltern: header,
        id: 'counter'
    });
}

const init = () =>{

    myCanvas.width = document.body.clientWidth;
    myCanvas.height = window.innerHeight - 80;

    pong.posX = myCanvas.width/2 + 30;
    pong.posY = myCanvas.height - 50;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    header();
    newBall();
    render();
}

init();