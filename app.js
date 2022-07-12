import {
    Ball
} from './ball.js';

import {
    Block
}from './block.js'

var ballarr = [];

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 15);
        this.block = new Block(500, 30, 300, 350);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate(t){
        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('keydown',function(t){
            if(t.code === 'Space'){
                var ball = new Ball(this.stageWidth, this.stageHeight, 30, 15);
                ballarr.push(cactus);
            }
        })

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }
}

window.onload = () => {
    new App();
};