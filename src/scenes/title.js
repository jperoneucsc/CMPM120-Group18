class Title extends Phaser.Scene {
    constructor() {
        super('Title')
    }

    init(data)
    {
        this.score = data.data;
    }

    preload(){
        this.load.image("menuBG", "src/assets/titlemenu/menuBG.png");
        this.load.image("sprite", "src/assets/titlemenu/skater_side.png");
        this.load.image("titleText", "src/assets/titlemenu/titleText.png");
        
        this.load.image("playButtonBack", "src/assets/titlemenu/buttonBack.png");
        this.load.image("fullscreenButton", "src/assets/titlemenu/fullscreenToggle.png");
        this.load.image('cloud1', 'src/assets/titlemenu/cloud1.png')
        this.load.image('cloud2', 'src/assets/titlemenu/cloud2.png')
        this.load.image('cloud3', 'src/assets/titlemenu/cloud3.png')
    }

    create() {
        if (this.score == null){
            this.score = 0;
        }
        this.cameras.main.fadeIn(2000);

        let menuBG = this.add.image(0, 0, 'menuBG').setOrigin(0,0).setInteractive();

        // Initialize fonts
        var style = { font: "Bold 132px Courier New", fill: '0xFFFFFF', boundsAlignH: 'center', boundsAlignV: 'middle'};
        var style2 = { font: "Bold 42px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};

        this.fullscreenButton = this.add.image(75, 75, 'fullscreenButton').setScale(2).setInteractive().on('pointerover', () => {
        }).on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
    

        this.cloud1 = this.add.image(1200, 200, 'cloud1');
        this.cloud2 = this.add.image(1100, 500, 'cloud2');
        this.cloud3 = this.add.image(500, 800, 'cloud3');
        this.tweens.add({
            targets: [this.cloud1],
            x: '-=1200',
            y: 250,
            duration: 40000,
            ease: ('Power1.easeout'),
            repeat: -1
        })
        this.tweens.add({
            targets: [this.cloud2],
            x: '-=1200',
            y: 250,
            duration: 90000,
            ease: ('Power1.easeout'),
            repeat: -1
        })
        this.tweens.add({
            targets: [this.cloud3],
            x: -200,
            y: 800,
            duration: 100000,
            ease: ('Power1.easeout'),
            repeat: -1
        })
        // When the scene fades in
        this.cameras.main.on('camerafadeincomplete', () => {
            // If the background is being hovered over, reset button scales
            menuBG.on('pointerover', () => {
                this.playButtonText.setScale(1);
                this.creditsButtonText.setScale(.6);
            });
            // Add highscore and floating animation
            this.highScore = this.add.text(850, 305, "Your High Score: " + this.score, style2).setOrigin(.5,.5).setRotation(.6).setScale(0);
            this.tweens.add({
                targets: this.highScore,
                y: { start: 240, from: 240, to: 190},
                ease:'Power1',
                yoyo: true,
                repeat: -1,
                duration: 1000,
            })

            this.playButtonText = this.add.text(540, 860, "PLAY", style).setOrigin(.5,.5).setDepth(1).setScale(2).setAlpha(0);
            this.playButtonBack = this.add.image(540, 860, 'playButtonBack').setScale(.7).setAlpha(0).setInteractive().on('pointerover', () => {
                this.playButtonText.setScale(0.8);
                this.creditsButtonText.setScale(.6);
            }).on('pointerdown', () => {
                this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Game', {data: this.score});
                });
            });

            this.creditsButtonText = this.add.text(540, 1000, "CREDITS", style).setOrigin(.5,.5).setDepth(1).setScale(.6).setAlpha(0);
            this.creditsButtonBack = this.add.image(540, 1000, 'playButtonBack').setScale(.7).setAlpha(0).setInteractive().on('pointerover', () => {
                this.creditsButtonText.setScale(0.5);
                this.playButtonText.setScale(1);
            }).on('pointerdown', () => {
                this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Credits', {data: this.score});
                });
            });


            this.titleText = this.add.image(540, 500, 'titleText').setScale(0);

            this.tweens.add({
                targets: [this.titleText],
                scale: {
                    from: 0,
                    to: 1.5,
                },
                ease: 'Linear',
                duration: 1000
            }).on('complete', () => {
                this.tweens.add({
                    targets: [this.playButtonText],
                    alpha: 1,
                    scale: {
                        from: 0,
                        to: 1,
                    },
                    ease: 'Linear',
                    duration: 1000
                });
                this.tweens.add({
                    targets: [this.creditsButtonText],
                    alpha: 1,
                    scale: {
                        from: 0,
                        to: 0.6,
                    },
                    ease: 'Linear',
                    duration: 1000
                });
                this.tweens.add({
                    targets: [this.highScore],
                    scale: {
                        from: 0,
                        to: 1,
                    },
                    ease: 'Linear',
                    duration: 1000
                });
                this.tweens.add({
                    targets: [this.playButtonBack, this.playButtonText, this.creditsButtonBack],
                    alpha: {
                        from: 0,
                        to: 0.01,
                    },
                    ease: 'Linear',
                    duration: 500
                });
            });
        });
    }
}