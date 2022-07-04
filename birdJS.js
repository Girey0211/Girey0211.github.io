var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var birdimg = new Image();
birdimg.src = './birdd.png'

var dino = {
    x:100,
    y:500,
    width:30,
    height:30,
    draw(){
        ctx.drawImage(birdimg, this.x, this.y);
    }
}

class Cactus {
    constructor(){
    this.x = 2000;
    this.y = Math.random() * 1000 % 650;
    this.width = 50;
    this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusArr = [];
var jumpTimer = 0;
var animation;

function perframes(){
    animation = requestAnimationFrame(perframes);
    timer++;

    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (timer %25 == 0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    cactusArr.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i,1);
        }
        a.x-=7;

        crush(dino, a);
        a.draw();
    })
    
    if(jumping == true){
        if(dino.y > 0){
            dino.y-=4;
        }
        jumpTimer++;
    }
    if(jumping == false){
        if(dino.y < 600){
            dino.y+=4;
        }
    
    }
    if(jumpTimer > 30 ){
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw()
}
perframes();


function crush(dino, cactus){
    if( cactus.x < dino.x + dino.width &&
        cactus.x + cactus.width > dino.x &&
        cactus.y < dino.y + dino.height &&
        cactus.y + cactus.height > dino.y
        
        ){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}


var jumping = false
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})