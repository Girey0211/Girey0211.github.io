var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = './images/birdd.png'

var img2 = new Image();
img2.src = './images/cactus.png'

let backImg = new Image();
backImg.src = "./images/amz.jpg";

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
        this.y = Math.random() * 1000 % 500;
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

let lev1 = false;
let lev2 = false;

function perframes(){
    animation = requestAnimationFrame(perframes);
    timer++;
    let score = document.getElementById("score");
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(backImg,0,0,canvas.width,canvas.height);

    if (timer % (22 - (level1*2)) === 0){
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

    if(score1 === 100 && lev1 === false){
        lev1 = true;
        level1++;
        level.innerHTML = level1.toString();
    }
    if(score1 === 200 && lev2 === false){
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
        if(bird.y < 500){
            bird.y+=4;
        }

    }
    if(jumpTimer > 30 ){
        jumping = false;
        jumpTimer = 0;
    }

    if(score1 === 300){
        cancelAnimationFrame(animation);
        document.write("<h1>CLEAR! THANKS TO YOUR PLAY!</h1>")
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
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        ctx.drawImage(backImg,0,0,canvas.width,canvas.height);
    }
}


var jumping = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})