class Game extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init(data){
        this.highscore = data.data
        this.DEPTH = { floor: 0};

        // Flags
        this.allow_input    = false;    // Can player move
        this.is_pause       = false;    // is the game paused?
        this.is_gameover    = false;    // display gameover screen?
        this.is_displayed   = false;
        this.current_count  = 0;        // current score
    } 

    preload(){
        this.load.image('background', 'src/assets/game/gameBG.png')
        this.load.image('progressBack', 'src/assets/game/progressBarBackground.png')
        this.load.image('progressMiddle', 'src/assets/game/progressBarMiddle.png')
        this.load.image('progressFront', 'src/assets/game/progressBarFront.png')
        this.load.image('skateboarder', 'src/assets/game/skater_player.png')
        this.load.image('car1', 'src/assets/game/car1.png')
        this.load.image('car2', 'src/assets/game/car2.png')
        this.load.image('car3', 'src/assets/game/car3.png')
        this.load.image('car4', 'src/assets/game/car4.png')
        this.load.image('trashcan', 'src/assets/game/trash.png')
        this.load.image('hydrant', 'src/assets/game/hydrant.png')
        this.load.atlas('fire', 'src/assets/game/fire.png', 'src/assets/game/fire.json')

        this.load.image("replayButton", "src/assets/game/replayButton.png");
        this.load.image("deathScreen", "src/assets/game/deathScreen.png");
        


        //this.load.audio('rollingSound', 'src/assets/skateboardingSound.mp3')
    }



    create() {
        this.anims.create({
            key: 'fireanim',
            duration: 700,
            frames: this.anims.generateFrameNames('fire', {
                start: 1,
                end: 2,
                prefix: 'fire',
                suffix: '.png'
            }),
            repeat: -1
        });

        // Get the screen width + height
        const width = this.scale.width;
        const height = this.scale.height;

        //this.backgroundNoise = this.sound.add('rollingSound', {volume : .05, rate : 1.5});
        //this.backgroundNoise.loop = true;
        //athis.backgroundNoise.play();
        
        const sceneWidth = 1080;
        const sceneHeight = 1920;

        this.physics.world.setBounds(0,-300, sceneWidth, sceneHeight);

        this.background = this.add.tileSprite(0, 0, 1080, 1920, 'background').setOrigin(0,0);

        //work out half way point of our game
        var leftHalf = config.width / 2;

        
        // Fade in camera
        this.cameras.main.fadeIn(1000);


        // Animate the character moving onscreen, then allow player movement
            
        this.player = this.physics.add.image(sceneWidth/2 - 220, -250, 'skateboarder').setScale(1.5).setAngle(180).setSize(55,100).setOffset(40,50).setDepth(3);
        this.player.setCollideWorldBounds(true);
        this.player.body.onCollide = true;
        
        this.tweens.add({
            targets: this.player,
            duration: 2000,
            y: this.player.y + 550,
            x: this.player.x + 200,
            ease: 'Power1'
        }).on('complete', () => {
            this.allow_input = true;
            var style2 = { font: "Bold 42px Arial", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};

            this.currentScore = this.add.text(1080/2, 1800, "SCORE: " + this.current_count, style2).setOrigin(.5,.5).setVisible(false);
            this.currentScore.setDepth(1);

            this.progressBack = this.add.image(1080/2, 75, 'progressBack').setDepth(1);
            this.progressBack.alpha = 0;
            this.bar = this.add.graphics().setDepth(4);
            this.bar.alpha = 0;
            this.bar2 = this.add.graphics().setDepth(3);
            this.bar2.alpha = 0;
            this.bar3 = this.add.graphics().setDepth(2);
            this.bar3.alpha = 0;
            this.progressFront = this.add.image(1080/2, 75, 'progressFront').setDepth(5);
            this.progressFront.alpha = 0;

            this.fire = this.add.sprite(1000, 70, 'fire').play('fireanim').setDepth(6);
            this.fire.alpha = 0;

            this.add.tween({
                targets: [this.progressBack, this.bar, this.progressFront, this.currentScore],
                duration: 1000,
                alpha: 1
            });
            this.tweens.add({
                targets: this.player,
                duration: 1000,
                y: this.player.y - 12,
                yoyo: true,
                ease: 'Circular',
                repeat: -1
            });
        });

        



        this.player.allow_input = true;


        // wait 3 seconds, then spawn the first car
        this.time.delayedCall(3000, () => { 
            this.addCar(); 
            this.addObstacle();
        });

        this.obstacleGroup = this.add.group({  
            runChildUpdate: true    
        });
        
        this.carGroup = this.add.group({
            runChildUpdate: true
        })

        this.goLeft = this.add.circle(270, 1200, 50,  '0xff0000')
        .setInteractive();
        this.goLeft.setAlpha(0.5);
        
        //Button goRight
        this.goRight = this.add.circle(810, 1200, 50,  '0xff0000')
        .setInteractive();
        this.goRight.setAlpha(0.5);


    }

    addObstacle() {
        let speed = 900;
        if(this.current_count >= 500){
            speed = 1080;
        }
        if(this.current_count >= 900 && this.current_count < 2000){
            speed = 1080;
        }
        if(this.current_count >= 2000){
            speed = 1380;
        }


        if(Phaser.Math.Between(1,2) == 1){
            let obstacle = new Obstacle(this, speed, 'trashcan');
            this.obstacleGroup.add(obstacle);
        }else {
            let obstacle = new Obstacle(this, speed, 'hydrant');
            this.obstacleGroup.add(obstacle);
        }
    }

    obstacleCollide() {
        this.cameras.main.shake(100, 0.015);
        this.player.setTint(0x666666);
        this.allow_input = false;
        this.is_gameover = true;
    } 

    addCar() {
        // Three stages:
        // over 500
        // over 1000
        // over 3000
        let speedVariance = 1100;
        if(this.current_count > 500 && this.current_count < 900){
            speedVariance =  Phaser.Math.Between(1300, 1500);
        }if(this.current_count >= 900 && this.current_count < 2000){
            speedVariance =  Phaser.Math.Between(1600, 1700);
        }
        if(this.current_count >= 2000){
            speedVariance =  Phaser.Math.Between(2100, 2150);
        }
        let randomNum = Phaser.Math.Between(1,4);
        let car = new Car(this, speedVariance, 'car' + randomNum);
        this.carGroup.add(car);
    }

    carCollide() {
        this.cameras.main.shake(100, 0.015);
        this.player.setTint(0x666666);
        this.allow_input = false;
        this.is_gameover = true;
    } 

    renderBar(){
        if (this.current_count < 920){
            this.bar.fillStyle(0x228B22, 0.8);
            this.bar.fillRect(100, 30, (this.current_count/3000)*900, 95);
        }
        if (this.current_count > 920 && this.current_count < 2000){
            this.bar2.alpha = 1;
            this.bar2.fillStyle(0x0047AB, 0.8);
            this.bar2.fillRect(100, 30, (this.current_count/3000)*900, 95);
        }
        if (this.current_count > 2000 && this.current_count < 2920){
            this.bar3.alpha = 1;
            this.bar3.fillStyle(0x880808, 0.8);
            this.bar3.fillRect(100, 30, (this.current_count/3000)*900, 95);
        }
        if (this.current_count == 3100){
            this.add.tween({
                targets: this.fire,
                duration: 1000,
                alpha: 1
            });
        }
    }

    endGame(){
        if (this.current_count > this.highscore){
            this.highscore = this.current_count;
        }

        // death screen
        // touch anywhere to go back to title menu
        console.log('hello');
        this.deathScreen = this.add.image(540, 600, 'deathScreen').setDepth(3);
        this.returnButton = this.add.image(540, 1250, 'replayButton').setInteractive();
        this.replayButton = this.add.image(540, 1000, 'replayButton').setInteractive();
        var style = { font: "Bold 64px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};
        this.add.text(1080/2, 500, "You Crashed!", style).setOrigin(.5,.5).setScale(1.5).setDepth(4);
        this.add.text(1080/2, 630, "Points: " + this.current_count, style).setOrigin(.5,.5).setDepth(4);
        this.add.text(1080/2, 700, "High Score: " + this.highscore, style).setOrigin(.5,.5).setDepth(4);
        this.replaytext = this.add.text(1080/2, 1000, "Play Again", style).setOrigin(.5,.5).setDepth(4).setInteractive();
        this.returntext = this.add.text(1080/2, 1250, "Return To Menu", style).setOrigin(.5,.5).setDepth(4).setInteractive();
        this.returnButton.on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Title', {data: this.highscore});
                });
        });
        this.returntext.on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Title', {data: this.highscore});
                });
        });
        this.replayButton.on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Game', {data: this.highscore});
                });
        });
        this.replaytext.on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Game', {data: this.highscore});
                });
        });
        this.returnButton.setDepth(3);
        this.replayButton.setDepth(3);

    }

    update()
    {  
        if(this.is_gameover == false){
            if(this.allow_input == true && this.is_gameover == false){
                this.current_count += 1;
                this.renderBar();
                this.currentScore.setVisible(true);
                this.currentScore.text = "SCORE: " + this.current_count;

                if(this.current_count < 500){
                    this.background.tilePositionY += 15;
                }
                if(this.current_count >= 500 && this.current_count < 2000){
                    this.background.tilePositionY += 18;
                }
                if(this.current_count >= 2000){
                    this.background.tilePositionY += 23;
                }

                // -------------------------------- PLAYER MOVEMENT ---------------------------------------
                const cursors = this.input.keyboard.createCursorKeys();
                const keys = this.input.keyboard.addKeys("W,A,S,D,E,SPACE");

                //By clicking the button goLeft
                this.goLeft.on('pointerdown', function (pointer){
                    this.goLeft.setAlpha(1);
                    keys.A.isDown = true;
                },this);
                //stop clicking the button goLeft
                this.goLeft.on('pointerup', function (pointer){
                    this.goLeft.setAlpha(0.5);
                    keys.A.isDown = false;
                },this);
        
                //By clicking the button goRight
                this.goRight.on('pointerdown', function (pointer){
                    this.goRight.setAlpha(1);
                    keys.D.isDown = true;
                },this);
                //stop clicking the button goRight
                this.goRight.on('pointerup', function (pointer){
                    this.goRight.setAlpha(0.5);
                    keys.D.isDown = false;
                },this);  


                // Check if player is pressing left or right
                if (cursors.left.isDown || keys.A.isDown){
                    this.player.body.velocity.x -= 30 ;
                }
                else if (cursors.right.isDown || keys.D.isDown){
                    this.player.body.velocity.x += 30 ;
                }else if (this.player.body.velocity.x > 0){
                        this.player.body.velocity.x -= 20;
                    } else if (this.player.body.velocity.x < 0){
                        this.player.body.velocity.x += 20;
                    }

                if (this.physics.overlap(this.player, this.obstacleGroup)) {
                    this.obstacleCollide();
                }
                if (this.physics.overlap(this.player, this.carGroup)) {
                    this.carCollide();
                }        
            }else this.background.tilePositionY += 18;
        }else {
            this.time.delayedCall(100, () => {
                this.player.destroy();
            });

            this.time.delayedCall(1000, () => {
                if(this.is_displayed == false){
                    this.endGame();
                    this.is_displayed = true;
                }
            });
        }
    }    

}