var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = './birdd.png'

var img2 = new Image();
img2.src = './cactus.png'

var diiiiiino = {
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

let score1= 0

function perframes(){
    animation = requestAnimationFrame(perframes);
    timer++;
    let score = document.getElementById("score");
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (timer %20 === 0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    cactusArr.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i,1);
            score1++;
            score.innerHTML= score1.toString();
        }
        a.x-=9;

        qkrdkTek(diiiiiino, a);
        a.draw();
    })
    
    if(jumping === true){
        if(diiiiiino.y > 0){
            diiiiiino.y-=4;
        }
        jumpTimer++;
    }
    if(jumping === false){
        if(diiiiiino.y < 500){
            diiiiiino.y+=4;
        }
    
    }
    if(jumpTimer > 30 ){
        jumping = false;
        jumpTimer = 0;
    }

    if(score1 === 500){
        cancelAnimationFrame(animation);
        document.write("<h1>CLEAR! THANKS TO YOUR PLAY!</h1>")
    }

    diiiiiino.draw()
}
perframes();


function qkrdkTek(diiiiiino, cactus){
    if( cactus.x < diiiiiino.x + diiiiiino.width &&
        cactus.x + cactus.width > diiiiiino.x &&
        cactus.y < diiiiiino.y + diiiiiino.height &&
        cactus.y + cactus.height > diiiiiino.y
        
        ){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}


var jumping = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})