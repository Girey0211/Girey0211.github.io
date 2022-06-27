var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x:100,
    y:500,
    width:50,
    height:50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
dino.draw();

class Cactus {
    constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
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

    if (timer % 180 == 0){
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
        dino.y-=6;
        jumpTimer++;
    }
    if(jumping == false){
        if(dino.y < 600){
            dino.y+=6;
        }
    }
    if(jumpTimer > 20 ){
        jumping = false;
        jumpTimer = 0;
    }
    dino.draw()
}
perframes();


function crush(dino, cactus){
    var xDistance = cactus.x - (dino.x + dino.width);
    var yDistance = cactus.y - (dino.y + dino.height);
    if(xDistance < 0 && yDistance < 0){
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