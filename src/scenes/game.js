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
    } 

    preload(){
        this.load.image('background', 'src/assets/game/gameBG.png')
        this.load.image('skateboarder', 'src/assets/game/skater_player.png')
        this.load.image('car1', 'src/assets/game/car1.png')
        this.load.image('car2', 'src/assets/game/car2.png')
        this.load.image('car3', 'src/assets/game/car3.png')
        this.load.image('car4', 'src/assets/game/car4.png')
        this.load.image('trashcan', 'src/assets/game/trash.png')
        this.load.image('obstacle', 'src/assets/game/trash.png')

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

        this.physics.world.setBounds(0,0, sceneWidth, sceneHeight);

        this.background = this.add.tileSprite(0, 0, 1080, 1920, 'background').setOrigin(0,0);


        this.obstacleGroup = this.add.group({  
            runChildUpdate: true    
        });
        
        this.carGroup = this.add.group({
            runChildUpdate: true
        })
        
        /*      temp disabled coins
        this.coinGroup = this.add.group({  
            runChildUpdate: true    
        });

        this.addCoin();
        */
       
        // Fade in camera
        this.cameras.main.fadeIn(1000);


        // Animate the character moving onscreen, then allow player movement
            
        this.player = this.physics.add.image(sceneWidth/2, -500, 'skateboarder').setScale(1.5).setAngle(180).setSize(35,160).setOffset(55,10);
        this.player.setCollideWorldBounds(true);
        this.player.body.onCollide = true;

/*
        this.tweens.add({
            targets: this.player,
            duration: 5000,
            y: this.player.y + 100
        })
        */



        this.player.allow_input = true;

        // wait 3 seconds, then spawn the first car
        this.time.delayedCall(3000, () => { 
            this.addCar(); 
            this.addObstacle();
        });

    

    }

    addObstacle() {
        let obstacle = new Obstacle(this, 900);
        this.obstacleGroup.add(obstacle);
    }

    obstacleCollide() {
        this.player.destroy()
    } 

    addCar() {
        let speedVariance =  Phaser.Math.Between(1400, 1600);
        let randomNum = Phaser.Math.Between(1,4);
        let car = new Car(this, speedVariance, 'car' + randomNum);
        this.carGroup.add(car);
    }

    carCollide() {
        this.player.destroy()
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
        // -------------------------------- PLAYER MOVEMENT ---------------------------------------
        const cursors = this.input.keyboard.createCursorKeys();
        const keys = this.input.keyboard.addKeys("W,A,S,D,E,SPACE");

        this.background.tilePositionY += 15;

        // Check if player is pressing left or right, with shift or not
        if (cursors.left.isDown || keys.A.isDown){
            this.player.x -= 8;
        }
        else if (cursors.right.isDown || keys.D.isDown){
            this.player.x += 8;
        }

        if (this.physics.overlap(this.player, this.obstacleGroup)) {
            this.obstacleCollide();
        }
 
        if (this.physics.overlap(this.player, this.carGroup)) {
            this.carCollide();
        }        
    }    

}