window.addEventListener('load', function(){
    // canvas setup
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 590;
    
    // game over buttons
    document.getElementById('gameOver').hidden = true;

    // controls
    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((  (e.key === 'ArrowUp') ||
                       //(e.key === 'ArrowDown') ||
                       (e.key === 'ArrowLeft') ||
                       (e.key === 'ArrowRight')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }//else if ( e.key === ' '){
                    //this.game.player.shootTop();
                // else if (e.key === 'r'){
                 //   this.game.player.shootTop2();
                //}
                //}
            });
            window.addEventListener('keyup', e =>{
                if (this.game.keys.indexOf(e.key) -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
            //window,addEventListener('touchstart', e => {
            //    this.game.player.shootTop();
                
                
                //console.log('shootttt');
            //});
        }
    }
    class Projectile {
        constructor(game, x, y,){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 60;
            this.height = 40;
            this.speed = 3;
            this.markedForDeletion = false;
            this.image = document.getElementById('shot');
        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 1) this.markedForDeletion = true;
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
            this.width = 38;
            this.height = 250;
            this.x = 350;
            this.y = 355;
            this.speedY = 5;
            this.speedX = 0;
            this.maxSpeed = 5;
            this.frameX = 3.7;
            this.frameY = 0;
            this.projectiles = [];
            this.image = document.getElementById('player');
        }
        update(){
            // this.frameY = 20; jump
            //if (this.game.keys.includes('ArrowUp')) {
            //    this.frameX = 3.7;
            //}
            //else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            //else this.speedY = 0;
            //this.y += this.speedY;

            if (this.game.keys.includes('ArrowLeft')) {
                //this.frameX = 2.2;
                this.speedX = -this.maxSpeed;
                //this.speedX = 3;
                setTimeout(() => { this.frameX = 0.1;
                }, 50, 
                );

                setTimeout(() => { this.frameX = 2.1;
                }, 100, 
                );

                setTimeout(() => { this.frameX = 0.1;
                }, 150, 
                );


                
            }
            else if (this.game.keys.includes('ArrowRight')) {
                //this.frameX = 3.7;
                this.speedX = this.maxSpeed;
                //this.speedX = 3;
                setTimeout(() => { this.frameX = 5.6;
                }, 50, 
                );

                setTimeout(() => { this.frameX = 7.5;
                }, 100, 
                );

                setTimeout(() => { this.frameX = 5.6;
                }, 150, 
                );


            }
            else this.speedX = 0;
            this.x += this.speedX;

            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }
        draw(context){
            //context.fillStyle = '';
            //context.fillRect(this.x, this.y, this.width, this.height);
            //context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop(){
            if (this.game.ammo > 0){
            // distance and local shoot
            this.projectiles.push(new Projectile(this.game, this.x + 45, this.y + 13));
            this.game.ammo--;
            this.frameX = 4;
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
            this.x = 1275;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = 0;
            this.markedForDeletion = false;
            this.lives = 1;
            //app.get('/scores, (req : mysql aqui')
            this.score = 2;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('enemy2');
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
    class Enemy2 {
        constructor(game){
            this.game = game;
            this.x = -120;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = 0;
            this.markedForDeletion = false;
            this.lives = 1;
            //app.get('/scores, (req : mysql aqui')
            this.score = 30;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('enemy2');
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


    // NPC'S ###########################
    class NPC1 {
        constructor(game){
            this.game = game;
            this.x = 600;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = 0;
            this.markedForDeletion = false;
            this.lives = 1;
            //app.get('/scores, (req : mysql aqui')
            this.score = 30;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('npc1');
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            //context.fillStyle = 'red';
            //context.fillRect(this.x, this.y, this.width, this.height);
            //context.fillStyle = 'black';
            //context.font = '20px Helvetica';
            //context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    // NPC'S ###########################


    class Angler1 extends Enemy {
        constructor(game){
            super(game);
            this.width = 628 * 0.2;
            this.height = 669 * 0.2;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 0.1 - this.height);
            this.y = 310;
        }
    }
    class Angler2 extends Enemy2 {
        constructor(game){
            super(game);
            this.width = 628 * 0.2;
            this.height = 669 * 0.2;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 0.1 - this.height);
            this.y = 310;
        }
    }

    // NPC'S ###########################
    class Angler3 extends NPC1 {
        constructor(game){
            super(game);
            this.width = 85;
            this.height = 90;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 0.1 - this.height);
            this.y = 335;
        }
    }
    // NPC'S ###########################


    class Layer {

    }
    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('layer1');
            this.x = -1330;
            this.y = -235;
            this.width = 24000;
            this.height = 1000;
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
            context.fillText('Score: ' + this.game.score, 170, 580);            
            // ammo
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(130 + 5 * i, 520, 3, 20);
            }
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, -200, 100);
            // game over messages
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.score > this.game.winningScore){
                    message1 = 'You Win!';
                    message2 = 'Well done!';
                    document.getElementById('smartphone').hidden = true;
                    
                    // gameOver buttons, hide true;
                    document.getElementById('gameOver').hidden = false;                     
                } else {
                    message1 = 'You lose!';
                    message2 = 'Try again next time!';
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
            // Enemy'S ###########################
            this.enemies = [];
            this.enemies2 = [];
            // Enemy'S ###########################

            // NPC'S ###########################
            this.npcs = [];
            // NPC'S ###########################

            this.enemyTimer = 0;
            this.enemyInterval = 1500;
            this.ammo = 20;
            //this.ammo2 = 5;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            // time skill recovery
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 1130;
            this.gameTime = 0;
            this.timeLimit = 50000000000000000000000000000000000000000000000000000000000000000000000000;
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
                    //enemy.markedForDeletion = true;
                    enemy.markedForDeletion = false;
                    //this.score--;
                    //document.getElementById('smartphone').hidden = false;
                    this.player.x = 1240;
                    //window.location.href="";
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = false;
                        if (enemy.lives <= 0){
                            enemy.markedForDeletion = false;
                            //this.score += enemy.score;
                            this.score = 0;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });
            this.enemies2.forEach(enemy2 => {
                enemy2.update();
                if (this.checkCollision(this.player, enemy2)){
                    enemy2.markedForDeletion = true;
                    //this.score--;
                    // wall block here :) sair da cidade, mapa aberto visao de cima w,a,s,d.
                    //this.player.x = 1285;
                    //document.getElementById('smartphone').hidden = false;
                    window.location.href="jogo-e-fasesf.html";
                }
                
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy2)){
                        enemy2.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy2.lives <= 0){
                            enemy2.markedForDeletion = true;
                            this.score += enemy2.score;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });

            // NPC'S ###########################
            this.npcs.forEach(npcs1 => {
                npcs1.update();
                if (this.checkCollision(this.player, npcs1)){
                    npcs1.markedForDeletion = false;
                    //this.score--;
                    document.getElementById('chat').hidden = false;
                    //window.location.href="jogo-e-fases.html";
                }
                else {
                    document.getElementById('chat').hidden = true;
                }
                
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, npcs1)){
                        npcs1.lives--;
                        projectile.markedForDeletion = true;
                        if (npcs1.lives <= 0){
                            npcs1.markedForDeletion = true;
                            this.score += npcs1.score;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });
            // NPC'S ###########################


            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                //this.addEnemy2();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies2 = this.enemies2.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy2();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            // NPC'S ###########################
            this.npcs = this.npcs.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addnpcs1();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            // NPC'S ###########################


        }
        draw(context){
            
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.enemies2.forEach(enemy2 => {
                enemy2.draw(context);
            });

            // NPC'S ###########################
            this.npcs.forEach(npcs1 => {
                npcs1.draw(context);
            });
            // NPC'S ###########################




            this.player.draw(context);
            this.ui.draw(context);
        }
        addEnemy(){
            this.enemies.push(new Angler1(this));
            console.log(this.enemies);
        }
        addEnemy2(){
            this.enemies2.push(new Angler2(this));
            console.log(this.enemies2);
        }

        // NPC'S ###########################
        addnpcs1(){
            this.npcs.push(new Angler3(this));
            console.log(this.npcs);
        }
        // NPC'S ###########################

        checkCollision(rect1, rect2){
            return (        rect1.x < rect2.x + rect2.width &&
                            rect1.x + rect1.width > rect2.x &&
                            rect1.y < rect2.y + rect2.height &&
                            rect1.height + rect1.y > rect2.y)
        }
    }

    const game = new Game(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    let lastTime = 0;
    // animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        game.update(deltaTime);
        game.draw(ctx);
        
        requestAnimationFrame(animate);
    }
    animate(0);
});











// 00:59:54
