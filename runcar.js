window.addEventListener('load', function(){
    // canvas setup
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1350;
    canvas.height = 600;
    
    // game over buttons
    

    //var db = openDatabase("meubanco", "2.0", "Mybase", 6048);
    //db.transaction(function(criar){
    //    criar.executeSql("CREATE TABLE itens (ID PRIMARY KEY, gold REAL, silver REAL, bronze REAL)");
        //criar.executeSql("DROP TABLE itens");
    //});
    
    

    // controls
    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((  (e.key === 'ArrowUp') ||
                       (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                //if ( e.key === ' '){
                //    this.game.player.shootTop();
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
            this.speed = 10;
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
        //terminar
    }
    class Player {
        constructor(game){
            this.game = game;
            this.width = 160;
            this.height = 70;
            this.x = 20;
            this.y = 230;
            this.speedY = 0;
            this.speedX = 0;
            this.maxSpeed = 13;
            this.projectiles = [];
            this.image = document.getElementById('player');
        }
        update(){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;

            //if (this.game.keys.includes('ArrowLeft')) this.speedX = -1;
            //else if (this.game.keys.includes('ArrowRight')) this.speedX = 1;
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
            this.projectiles.push(new Projectile(this.game, this.x + 95, this.y + 40));
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
            this.x = 6250;
            //this.speedX = Math.random() * - 0.01 - 25;
            this.speedX = -25;
            this.markedForDeletion = false;
            this.lives = 10;
            //app.get('/scores, (req : mysql aqui')
            //this.score = 2;
            this.score = localStorage.gold;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('enemy');
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < -6660) this.markedForDeletion = true;
        }
        draw(context){
            //context.fillStyle = 'red';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.font = '20px Helvetica';
            //context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Angler1 extends Enemy {
        constructor(game){
            super(game);
            this.width = 160;
            this.height = 70;
            // local altura spawn
            this.y = 174;
            //this.y = 130;
        }
    }

    //................................... enemy 1

    class Enemy2 {
        constructor(game){
            this.game = game;
            this.x = 0;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = 0;
            this.markedForDeletion = false;
            this.lives = 10;
            //app.get('/scores, (req : mysql aqui')
            //this.score = 2;
            this.score = localStorage.gold;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('cimabaixo');
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            //context.fillStyle = 'red';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            //context.font = '20px Helvetica';
            //context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Angler2 extends Enemy2 {
        constructor(game){
            super(game);
            this.width = 6000;
            this.height = 950;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 2 - this.height);
            this.y = -800;
        }
    }
    
    //...............................................................


    class Enemy3 {
        constructor(game){
            this.game = game;
            this.x = 6250;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = -20;
            this.markedForDeletion = false;
            this.lives = 10;
            //app.get('/scores, (req : mysql aqui')
            //this.score = 2;
            this.score = localStorage.gold;
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
            //context.font = '20px Helvetica';
            //context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Angler3 extends Enemy3 {
        constructor(game){
            super(game);
            this.width = 160;
            this.height = 70;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 2 - this.height);
            this.y = 300;
        }
    }
    
    //...............................................................


    class Enemy4 {
        constructor(game){
            this.game = game;
            this.x = 0;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = 0;
            this.markedForDeletion = false;
            this.lives = 10;
            //app.get('/scores, (req : mysql aqui')
            //this.score = 2;
            this.score = localStorage.gold;
            //this.score = UPDATE `loginuser` SET `gold_qt` = gold_qt + 1
            this.image = document.getElementById('cimabaixo');
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            //context.fillStyle = 'red';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            //context.font = '20px Helvetica';
            //context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Angler4 extends Enemy4 {
        constructor(game){
            super(game);
            this.width = 6000;
            this.height = 950;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 2 - this.height);
            this.y = 420;
        }
    }
    
    //...............................................................

    class Layer {

    }
    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('layer1');
            this.x = 0;
            this.y = -80;
            this.width = 3000;
            this.height = 1000;
            this.speed = 22;
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
            context.fillText('Score: ' + this.game.score, 162, 580);            
            // ammo
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(140 + 5 * i, 525, 3, 20);
            }
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, 100, 100);
            // game over messages
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.win > this.game.winningScore){
                    message1 = 'You Win!';
                    message2 = 'Well done!';
                    //document.getElementById('next1').hidden = false;
                    //document.getElementById('again').hidden = false;
                                         
                } else {
                    message1 = 'You lose!';
                    message2 = 'Try again next time!';
                    document.getElementById('next1').hidden = false;
                    document.getElementById('username').hidden = false;
                    document.getElementById('message').hidden = false;


                    //window.location.href="index2.html";
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
            //................................. enemy 2
            
            this.enemies = [];
            this.enemies2 = [];
            this.enemies3 = [];
            this.enemies4 = [];




            //.................................

            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.ammo = 10;
            //this.ammo2 = 5;
            this.maxAmmo = 70;
            this.ammoTimer = 0;
            // time skill recovery
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.damage = localStorage.damage;
            this.win = 0;
            
            //this.score == db.transaction(function(armazenar){
            //    armazenar.executeSql("INSERT INTO users ");
            //});
            // life, armour
            this.winningScore = 5;
            this.gameTime = 0;
            this.gameTime2 = 0;
            this.timeLimit = 10000;
            this.timeLimit2 = 5000000;
        }
        update(deltaTime){
            if (!this.gameOver) this.gameTime += deltaTime;
            if (this.gameTime > this.timeLimit) this.gameOver = true;
            if (this.gameTime2 > this.timeLimit2) this.gameOver = true;
            this.player.update();
            if (this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            //..................................

            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true;
                    //this.score += 5;
                    this.game.win += 5;
                    //this.gameTime2 += 1000000;
                    //this.score == db.transaction(function(armazenar){
                    //    armazenar.executeSql("INSERT INTO users ");
                    //});

                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)){
                        enemy.lives -= this.damage;
                        projectile.markedForDeletion = true;
                        if (enemy.lives <= 0){
                            enemy.markedForDeletion = true;
                            this.win++;
                            this.score = localStorage.gold++;  
                            // xp only boss
                            localStorage.xp++;
                            //this.score = localStorage.gold++;
                            //db.transaction(function(armazenar){
                            //    armazenar.executeSql("UPDATE itens SET gold = gold + 1");
                                //armazenar.executeSql("INSERT INTO itens (gold) VALUES (1)");
                                //armazenar.executeSql("INSERT INTO itens (silver) VALUES (1)");
                                //armazenar.executeSql("INSERT INTO itens (bronze) VALUES (1)");
                            //});
                            if (this.win > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });
            //....................................... enemy 3

            this.enemies2.forEach(enemy2 => {
                enemy2.update();
                if (this.checkCollision(this.player, enemy2)){
                    enemy2.markedForDeletion = true;
                    this.game.win += 5;
                    //this.score--;
                    //this.gameTime += 5000;
                    // wall block here :) sair da cidade, mapa aberto visao de cima w,a,s,d.
                    //this.player.x = 1285;
                    //document.getElementById('smartphone').hidden = false;
                    //window.location.href="";
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

            //..............................................


            this.enemies3.forEach(enemy3 => {
                enemy3.update();
                if (this.checkCollision(this.player, enemy3)){
                    enemy3.markedForDeletion = true;
                    this.game.win += 5;
                    //this.score--;
                    //this.gameTime += 5000;
                    // wall block here :) sair da cidade, mapa aberto visao de cima w,a,s,d.
                    //this.player.x = 1285;
                    //document.getElementById('smartphone').hidden = false;
                    //window.location.href="";
                }
                
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy3)){
                        enemy3.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy3.lives <= 0){
                            enemy3.markedForDeletion = true;
                            this.score += enemy3.score;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });

            //..............................................


            this.enemies4.forEach(enemy4 => {
                enemy4.update();
                if (this.checkCollision(this.player, enemy4)){
                    enemy4.markedForDeletion = true;
                    this.game.win += 5;
                    //this.score--;
                    //this.gameTime += 5000;
                    // wall block here :) sair da cidade, mapa aberto visao de cima w,a,s,d.
                    //this.player.x = 1285;
                    //document.getElementById('smartphone').hidden = false;
                    //window.location.href="";
                }
                
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy4)){
                        enemy4.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy4.lives <= 0){
                            enemy4.markedForDeletion = true;
                            this.score += enemy4.score;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });

            //..............................................

            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            //.............................................. enemy 4

            this.enemies2 = this.enemies2.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy2();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            //..............................................


            this.enemies3 = this.enemies3.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy3();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            //..............................................


            this.enemies4 = this.enemies4.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy4();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            //..............................................


        }
        draw(context){
            this.player.draw(context);
            this.ui.draw(context);

            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            //.................................. enemy 5

            this.enemies2.forEach(enemy2 => {
                enemy2.draw(context);
            });

            //..................................

            this.enemies3.forEach(enemy3 => {
                enemy3.draw(context);
            });

            //..................................


            this.enemies4.forEach(enemy4 => {
                enemy4.draw(context);
            });

            //..................................



        }
        addEnemy(){
            this.enemies.push(new Angler1(this));
            console.log(this.enemies);
        }

        //.................................. enemy 6

        addEnemy2(){
            this.enemies2.push(new Angler2(this));
            console.log(this.enemies2);
        }

        //..................................


        addEnemy3(){
            this.enemies3.push(new Angler3(this));
            console.log(this.enemies3);
        }

        //..................................


        addEnemy4(){
            this.enemies4.push(new Angler4(this));
            console.log(this.enemies4);
        }

        //..................................


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
