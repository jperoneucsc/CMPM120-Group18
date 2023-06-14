class Title extends Phaser.Scene {
    constructor() {
        super('Title')
    }

    init(data)
    {
        this.score = data.data;
    }

    preload(){
        this.load.image("menuBG", "src/assets/titleMenu/menuBG.png");
        this.load.image("sprite", "src/assets/titleMenu/skater_side.png");
        this.load.image("titleText", "src/assets/titleMenu/titleText.png");
        
        this.load.image("playButtonBack", "src/assets/titleMenu/PlayButtonBack.png");
        this.load.image("creditsButtonBack", "src/assets/titleMenu/CreditsButtonBack.png");
        /*
        this.load.image("playButtonText", "src/assets/titleMenu/PlayButtonFront.png");
        this.load.image("creditsButtonBack", "src/assets/titleMenu/CreditsButtonBack.png");
        this.load.image("creditsButtonText", "src/assets/titleMenu/CreditsButtonText.png");
        this.load.image("tempMenuAsset", "src/assets/titleMenu/tempMenuAsset.png");
        */
    }

    create() {
        this.cameras.main.fadeIn(2000);

        let menuBG = this.add.image(0, 0, 'menuBG').setOrigin(0,0).setInteractive();

        // Initialize fonts
        var style = { font: "Bold 132px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};
        var style2 = { font: "Bold 42px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};

    


        /*
        let playButtonText = this.add.image(700, 1080/1.8, 'playButtonText').setScale(1.6).setInteractive().on('pointerover', () => {
            playButtonText.setScale(1.3);
        }).on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Game', {data: this.score});
            });
        });


        // Create Credits Button Back Layer
        let creditsButtonBack = this.add.image(700, 1080/1.35, 'creditsButtonBack').setScale(1.25).setInteractive().on('pointerover', () => {
            creditsButtonText.setScale(1);
        }).on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Credits');
            });
        }); // Create Credits Button Text Layer
        let creditsButtonText = this.add.image(700, 1080/1.35, 'creditsButtonText').setScale(1.25).setInteractive().on('pointerover', () => {
            creditsButtonText.setScale(1);
        }).on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Credits');
            });
        });
        */

    
        


        // When the scene fades in
        this.cameras.main.on('camerafadeincomplete', () => {
            // Add highscore and floating animation
            this.highScore = this.add.text(850, 305, "Your High Score: 0" /*+ this.score*/, style2).setOrigin(.5,.5).setRotation(.6).setScale(0);
            this.tweens.add({
                targets: this.highScore,
                y: { start: 240, from: 240, to: 190},
                ease:'Power1',
                yoyo: true,
                repeat: -1,
                duration: 1000,
            })

            this.playButtonText = this.add.text(540, 860, "PLAY", style).setOrigin(.5,.5).setDepth(1).setScale(2).setAlpha(0);
            this.playButtonBack = this.add.image(540, 860, 'playButtonBack').setScale(1.6).setScale(0).setInteractive().on('pointerover', () => {
                this.playButtonText.setScale(0.7);
            }).on('pointerdown', () => {
                this.cameras.main.fadeOut("1000");
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('Game'/*, {data: this.score}*/);
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
                    targets: [this.highScore, this.playButtonBack, this.playButtonText],
                    scale: {
                        from: 0,
                        to: 1,
                    },
                    ease: 'Linear',
                    duration: 1000
                });
            });
        });

        // If the background is being hovered over, reset button scales
        menuBG.on('pointerover', () => {
            this.playButtonText.setScale(1);
        });
    }
}