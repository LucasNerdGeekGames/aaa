
// load images and game
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 600;


    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight' ||
                        e.key === 'r')
                        && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e => {
                if (   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }

    }

    

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 340;
            this.height = 550;
            this.x = 10;
            this.y = 340;
            //this.y = this.gameHeight - this.height;
            this.image = document.getElementById('player');
            // imagem complete right and left
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 0;
            this.speed = 0;
        }
        draw(context){
            //context.fillStyle = 'white';
            //context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input){
            this.x += this.speed;
            //if (input.keys.indexOf('ArrowDown') > -1){
            //    this.speed = 5;
            
            //} 
            //else if (input.keys.indexOf('ArrowUp') > -1) {
            //    this.speed = -5;
            //} else {
            //    this.speed = 0;
            //}

            //this.y += this.speed;
            if (input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
                //this.frameX = 3.7;
                background.update();
                
                //if (this.frameX < this.maxFrame) {
                //    this.frameX++;
                //} else {
                //    this.frameX = 3.2;
                
               // }
                
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
                //this.frameX = 0.3;
                
            }
                         
            else {
                this.speed = 0;
                //this.frameX = 2;
            }
            

            //if (input.keys.indexOf('r') > -1){
            //    boom.draw(ctx);
            //} 
        }
        
    }
    

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('layer01');
            this.x = 0;
            this.y = 0;
            this.width = 1700;
            this.height = 1300;
            this.speed = 1;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }

    }

    // class teleport
    class Caminhao {
        constructor(gameWidth, gameHeight){
            //this.gameWidth = gameWidth;
            //this.gameHeight = gameHeight;
            this.image = document.getElementById('playerImage2');
            this.x = 1500;
            this.y = 330;
            this.width = 240;
            this.height = 210;
            this.speed = 4;
            //onclick =location.href='index3.html';
            
        }
        draw(context){
            //context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < -220 - this.width) this.x = 2500;
            
        }
    } 
    
    
    

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const caminhao = new Caminhao(canvas.width, canvas.height);
    
    //const boom = new Boom(canvas.width, canvas.height);

    player.draw(ctx);
    player.update(input);

    // order 1.....
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        
        caminhao.draw(ctx);
        caminhao.update();


        
        //boom.draw(ctx);
        //boom.update();
        
        player.draw(ctx);
        player.update(input);
        
        requestAnimationFrame(animate);

    }
    animate();

});


// 13:28

// back 01:53


// full 05:10:08 - javascript game development course for beginners

// botao mapa geral, com cada quadra da cidade, onde ficam lojas e dungeons separadas.

//  depois tela log-in, escolher 
//      | skate ou patins |

// 08:35:10

//