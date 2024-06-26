window.addEventListener('load', function(){
    // canvas setup
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 600;
    
    // game over buttons
    //document.getElementById('gameOver').hidden = true;

    // controls
    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((  (e.key === 'ArrowUp') ||
                       (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }else if ( e.key === ' '){
                    this.game.player.shootTop();
                //}// else if (e.key === 'r'){
                 //   this.game.player.shootTop2();
                //}
                }
            });
            window.addEventListener('keyup', e =>{
                if (this.game.keys.indexOf(e.key) -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
            window,addEventListener('touchstart', e => {
                this.game.player.shootTop();
                
                
                //console.log('shootttt');
            });
        }
    }
    class Projectile {
        constructor(game, x, y,){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 20;
            this.speed = 3;
            this.markedForDeletion = false;
            this.image = document.getElementById('shot');
        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }
        draw(context){
            //context.fillStyle = 'yellow';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    }
    class Particle {

    }
    class Player {
        constructor(game){
            this.game = game;
            this.width = 170;
            this.height = 90;
            this.x = 20;
            this.y = 100;
            this.speedY = 5;
            this.speedX = 0;
            this.maxSpeed = 5;
            this.projectiles = [];
            this.image = document.getElementById('player');
        }
        update(){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;

            //if (this.game.keys.includes('ArrowUp')) this.speedX = -1;
            //else if (this.game.keys.includes('ArrowDown')) this.speedX = 1;
            //else this.speedX = 0;
            //this.x += this.speedX;

            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }
        draw(context){
            //context.fillStyle = '';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop(){
            if (this.game.ammo > 0){
            // distance and local shoot
            this.projectiles.push(new Projectile(this.game, this.x + 110, this.y + 88));
            this.game.ammo--;
            }
        }
        // swords and melee
        //shootTop2(){
        //    if (this.game.ammo2 > 0){
        //    // distance and local shoot
        //    this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 130));
        //    this.game.ammo2--;
        //    }
        //}
    }
    class Enemy {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = Math.random() * -6 - 0.5;
            this.markedForDeletion = false;
            this.lives = 1;
            //app.get('/scores, (req : mysql aqui')
            this.score = 30;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('enemy');
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            //context.fillStyle = 'red';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Angler1 extends Enemy {
        constructor(game){
            super(game);
            this.width = 328 * 0.2;
            this.height = 469 * 0.2;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 0.1 - this.height);
            this.y = 160;
        }
    }
    class Layer {

    }
    class Background {

    }
    class UI {
        constructor(game){
            this.game = game;
            this.fontsize = 25;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetX = 2;
            context.shadowColor = 'black';
            context.font = this.fontsize + 'px ' + this.fontFamily;
            // score
            context.fillText('Score: ' + this.game.score, 20, 40);            
            // ammo
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, 20, 100);
            // game over messages
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.score > this.game.winningScore){
                    message1 = 'You Win!';
                    message2 = 'Well done!';

                    window.location.href="jogo-e-fasesf.html";
                    
                    // gameOver buttons, hide true;
                                         
                } else {
                    message1 = 'You lose!';
                    message2 = 'Try again next time!';
                    window.location.href="jogo-e-fasesf.html";
                }
                context.font = '50px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.3);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.4);
            }
            context.restore();
        }

    }
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.ammo = 20;
            //this.ammo2 = 5;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            // time skill recovery
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 30;
            this.gameTime = 0;
            this.timeLimit = 5000000;
        }
        update(deltaTime){
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;
            this.player.update();
            if (this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true;
                    this.score--;
                    this.gameTime += 500000;
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy.lives <= 0){
                            enemy.markedForDeletion = true;
                            this.score += enemy.score;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
        }
        draw(context){
            this.player.draw(context);
            this.ui.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
        addEnemy(){
            this.enemies.push(new Angler1(this));
            console.log(this.enemies);
        }
        checkCollision(rect1, rect2){
            return (        rect1.x < rect2.x + rect2.width &&
                            rect1.x + rect1.width > rect2.x &&
                            rect1.y < rect2.y + rect2.height &&
                            rect1.height + rect1.y > rect2.y)
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    // animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});











// 00:59:54