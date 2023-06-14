class Credits extends Phaser.Scene {
    constructor() {
        super('Credits')
    }

    init(data)
    {
        this.score = data.data;
    }

    preload(){
        this.load.image("deathScreen", "src/assets/game/deathScreen.png");
    }

    create() {
        this.cameras.main.fadeIn(2000);

        let menuBG = this.add.image(0, 0, 'menuBG').setOrigin(0,0).setInteractive();

        // Initialize fonts
        var style = { font: "Bold 132px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};
        var style2 = { font: "Bold 42px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};


        let creditsBox = this.add.image(540, 500, 'deathScreen').setScale(1.5).setAngle(90);

        this.playButtonText = this.add.text(540, 1300, "Return", style).setOrigin(.5,.5).setDepth(1).setScale(0.7);
        this.playButtonBack = this.add.image(540, 1300, 'playButtonBack').setScale(1.6).setScale(1).setInteractive().on('pointerover', () => {
            this.playButtonText.setScale(0.5);
        }).on('pointerdown', () => {
            this.cameras.main.fadeOut("1000");
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Game', {data: this.score});
            });
        });
        


        // When the scene fades in
        this.cameras.main.on('camerafadeincomplete', () => {
            // If the background is being hovered over, reset button scales
            menuBG.on('pointerover', () => {
            this.playButtonText.setScale(1);
        });



        });
    }
}