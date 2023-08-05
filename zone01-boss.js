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
                //if ((  (e.key === 'ArrowUp') ||
                //       (e.key === 'ArrowDown')
                //) && this.game.keys.indexOf(e.key) === -1){
                //    this.game.keys.push(e.key);   em baixo else if
                if ( e.key === ' '){
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

    }
    class Player {
        constructor(game){
            this.game = game;
            this.width = 110;
            this.height = 105;
            this.x = 20;
            this.y = 130;
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
            this.x = this.game.width;
            //this.speedX = Math.random() * -6 - 0.5;
            this.speedX = Math.random() * -0.01 - 4.5;
            this.markedForDeletion = false;
            this.lives = 800;
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
            context.fillStyle = 'white';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Angler1 extends Enemy {
        constructor(game){
            super(game);
            this.width = 330 * 0.6;
            this.height = 459 * 0.6;
            // local altura spawn
            //this.y = Math.random() * (this.game.height * 0.1 - this.height);
            this.y = 20;
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
            context.fillText('Score: ' + this.game.score, 162, 580);            
            // ammo
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(140 + 5 * i, 525, 3, 20);
            }
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, -220, 100);
            // game over messages
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.win > this.game.winningScore){
                    message1 = 'You Win!';
                    message2 = 'Well done!';
                    document.getElementById('next1').hidden = false;
                    
                                         
                } else {
                    message1 = 'You lose!';
                    message2 = 'Try again next time!';
                    window.location.href="index2.html";
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
            this.enemyInterval = 5000;
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
            this.winningScore = 10;
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
                    //this.score--;
                    //this.win += 10;
                    this.gameTime += 5000000;
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
                            this.win++; this.win++; this.win++; this.win++; this.win++; this.win++; this.win++; this.win++; this.win++; this.win++; this.win++;
                            this.score = localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; localStorage.gold++; 
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