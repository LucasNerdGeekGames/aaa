// load images and game
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas3');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 587;


    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage2');
            this.x = 0;
            this.y = 0;
            this.width = 1350;
            this.height = 585;
            this.speed = 1;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            //this.x -= this.speed;
            //if (this.x < 0 - this.width) this.x = 0;
        }

    }

    
    
    const background = new Background(canvas.width, canvas.height);
    //const boom = new Boom(canvas.width, canvas.height);

    
    // order 1.....
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        
        //boom.draw(ctx);
        //boom.update();
        
                
        requestAnimationFrame(animate);

    }
    animate();

});


// 13:28

// back 01:53


// full 05:10:08 - javascript game development course for beginners
