var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = 640;

var img1 = new Image();
img1.src = './images/birdd.png'

var img2 = new Image();
img2.src = './images/cactus.png'

let backImg = new Image();
backImg.src = "./images/jungle.png";

var bird = {
    x:100,
    y:500,
    width:30,
    height:30,
    draw(){
        ctx.drawImage(img1, this.x, this.y);
    }
}

class Cactus {
    constructor(){
        this.x = 2000;
        this.y = Math.random() * 1000 % 590;
        this.width = 40;
        this.height = 40;
    }
    draw(){
        ctx.drawImage(img2, this.x, this.y);
    }
}
var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusArr = [];
var jumpTimer = 0;
var animation;

var score = document.getElementById("score");
let score1 = 0;
var level = document.getElementById("level");
let level1 = 1;
var highscore = document.getElementById("highscore");
let hs1 = parseInt(localStorage.getItem("hs")) || 0;
highscore.innerHTML= hs1.toString();

let clearment = document.getElementById("clearment");

let hsc = document.getElementById("hsc");
let sc = document.getElementById("sc");
let le = document.getElementById("le");
let ti = document.getElementById("ti");

let thank = document.getElementById("thank");

let lev1 = false;
let lev2 = false;

let sec = parseInt(localStorage.getItem("sec")) || 0;
let min = parseInt(localStorage.getItem("min")) || 0;
let hor = parseInt(localStorage.getItem("hor")) || 0;
let second = document.getElementById("second");
let minute = document.getElementById("minute");
let hour = document.getElementById("hour");

let timeron = true;

var audio = new Audio('nico.mp3');
audio.play();

function perframes(){
    animation = requestAnimationFrame(perframes);
    timer++;
    let score = document.getElementById("score");
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(backImg,0,0,canvas.width,640);

    if (timer % (23 - (level1 * 4)) === 0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    cactusArr.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i,1);
            score1++;
            score.innerHTML= score1.toString();
        }
        a.x -= (5 + (level1 * 2));

        crush(bird, a);
        a.draw();
    })

    if(score1 >= 100 && lev1 === false){
        lev1 = true;
        level1++;
        level.innerHTML = level1.toString();
    }
    if(score1 >= 200 && lev2 === false){
        lev2 = true;
        level1++;
        level.innerHTML = level1.toString();
    }

    if(jumping === true){
        if(bird.y > 0){
            bird.y-=4;
        }
        jumpTimer++;
    }
    if(jumping === false){
        if(bird.y < 590){
            bird.y+=4;
        }

    }
    if(jumpTimer > 30 ){
        jumping = false;
        jumpTimer = 0;
    }
    if(sec >= 59){
        sec -= 60;
        min++;
    }
    if(min >= 60){
        min -= 60;
        hor++;
    }

    if(score1 === 300){
        cancelAnimationFrame(animation);
        localStorage.setItem("hs", "300");
        localStorage.setItem("sec", sec);
        localStorage.setItem("min", min);
        localStorage.setItem("hor", hor);
        ctx.clearRect(0,0,canvas.width, canvas.height);
        clearment.style.visibility = 'visible';
        score.style.visibility = 'hidden';
        level.style.visibility = 'hidden';
        highscore.style.visibility = 'hidden';
        hsc.style.visibility = 'hidden';
        sc.style.visibility = 'hidden';
        le.style.visibility = 'hidden';
        ti.style.visibility = 'hidden';
        thank.style.visibility = "visible";
        thank.style.left = bird.x
        thank.style.top = bird.y
    }

    bird.draw()
}
perframes();


function crush(bird, cactus){
    if( cactus.x < bird.x + bird.width &&
        cactus.x + cactus.width > bird.x &&
        cactus.y < bird.y + bird.height &&
        cactus.y + cactus.height > bird.y
    ){
        if(score1 > hs1){
            hs1 = score1;
            score.innerHTML= hs1.toString();
            localStorage.setItem("hs", hs1);
        }

        timeron = false;
        localStorage.setItem("sec", sec);
        localStorage.setItem("min", min);
        localStorage.setItem("hor", hor);

        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);

        alert("GAME OVER");
        alert("다시 플레이 하시겠습니까?");
        window.location.reload();
    }
}
var x = setInterval(function (){
    if(timeron === true) {
        sec++;
        second.innerHTML = sec.toString();
        minute.innerHTML = min.toString();
        hour.innerHTML = hor.toString();
    }
},1000);

var jumping = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})