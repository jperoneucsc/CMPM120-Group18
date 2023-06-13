class Game extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init(){
        this.DEPTH = { floor: 0};

        // Flags
        this.allow_input    = false;    // Can player move
        this.is_pause       = false;    // is the game paused?
        this.is_gameover    = false;    // display gameover screen?
        this.current_count  = 0;        // current score
    } 

    preload(){
        this.load.image('background', 'src/assets/game/gameBG.png')
        this.load.image('skateboarder', 'src/assets/game/skater_player.png')
        this.load.image('car1', 'src/assets/game/car1.png')
        this.load.image('car2', 'src/assets/game/car2.png')
        this.load.image('car3', 'src/assets/game/car3.png')
        this.load.image('car4', 'src/assets/game/car4.png')
        this.load.image('trashcan', 'src/assets/game/trash.png')
        this.load.image('hydrant', 'src/assets/game/hydrant.png')

        //this.load.audio('rollingSound', 'src/assets/skateboardingSound.mp3')
    }



    create() {
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

    
        
        

        
        /*      temp disabled coins
        this.coinGroup = this.add.group({  
            runChildUpdate: true    
        });

        this.addCoin();
        */
       
        // Fade in camera
        this.cameras.main.fadeIn(1000);


        // Animate the character moving onscreen, then allow player movement
            
        this.player = this.physics.add.image(sceneWidth/2 - 100, -250, 'skateboarder').setScale(1.5).setAngle(180).setSize(45,100).setOffset(50,50);
        this.player.setCollideWorldBounds(true);
        this.player.body.onCollide = true;


        this.tweens.add({
            targets: this.player,
            duration: 2000,
            y: this.player.y + 450,
            x: this.player.x + 100,
            ease: 'Power1'
        }).on('complete', () => {
            this.allow_input = true;
            var style2 = { font: "Bold 42px Arial", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};
            this.currentScore = this.add.text(1080/2, 1800, "current score: " + this.current_count, style2).setOrigin(.5,.5).setVisible(false);
            this.currentScore.setDepth(1);
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


    }

    addObstacle() {
        if(Phaser.Math.Between(1,2) == 1){
            let obstacle = new Obstacle(this, 900, 'trashcan');
            this.obstacleGroup.add(obstacle);
        }else {
            let obstacle = new Obstacle(this, 900, 'hydrant');
            this.obstacleGroup.add(obstacle);
        }
    }

    obstacleCollide() {
        this.allow_input = false;
        this.is_gameover = true;
    } 

    addCar() {
        let speedVariance =  Phaser.Math.Between(1400, 1600);
        let randomNum = Phaser.Math.Between(1,4);
        let car = new Car(this, speedVariance, 'car' + randomNum);
        this.carGroup.add(car);
    }

    carCollide() {
        this.allow_input = false;
        this.is_gameover = true;
    } 

/*
    addCoin() {
        let CspeedVariance =  Phaser.Math.Between(100, 500);
        let coin = new Coin(this, 1500);
        this.coinGroup.add(coin);
    }

    coinCollide() {
        const coins = this.coinGroup.getChildren();
        const coin = Phaser.Utils.Array.RemoveRandomElement(coins);
        if (coin)
        {
            coin.destroy();
        }
    } 
*/



    update()
    {  
        this.current_count += 1;
        if(this.is_gameover == false){
            if(this.allow_input == true && this.is_gameover == false){
                this.currentScore.setVisible(true);
                this.currentScore.text = "current score: " + this.current_count;

                this.background.tilePositionY += 15;

                // -------------------------------- PLAYER MOVEMENT ---------------------------------------
                const cursors = this.input.keyboard.createCursorKeys();
                const keys = this.input.keyboard.addKeys("W,A,S,D,E,SPACE");

                // Check if player is pressing left or right
                if (cursors.left.isDown || keys.A.isDown){
                    this.player.body.velocity.x -= 30 ;
                }
                else if (cursors.right.isDown || keys.D.isDown){
                    this.player.body.velocity.x += 30 ;
                }else if (this.player.body.velocity.x > 0){
                        this.player.body.velocity.x -= 20;
                    } else this.player.body.velocity.x += 20;

                if (this.physics.overlap(this.player, this.obstacleGroup)) {
                    this.obstacleCollide();
                }
                if (this.physics.overlap(this.player, this.carGroup)) {
                    this.carCollide();
                }        
            }else this.background.tilePositionY += 18;
        }else {
            this.time.delayedCall(50, () => {
                this.player.destroy();
            });


        }
    }    

}