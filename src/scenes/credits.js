class Credits extends Phaser.Scene {
    constructor() {
        super('Credits')
    }

    init(data)
    {
        this.score = data.data;
    }

    preload(){
        this.load.image("creditsBox", "src/assets/credits/creditsBox.png");
    }

    create() {
        this.cameras.main.fadeIn(2000);

        let menuBG = this.add.image(0, 0, 'menuBG').setOrigin(0,0).setInteractive();

        this.fullscreenButton = this.add.image(75, 75, 'fullscreenButton').setScale(2).setInteractive().on('pointerover', () => {
        }).on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        
        // Initialize fonts
        var style = { font: "Bold 132px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};
        var style3 = { font: "Bold 72px Courier New", fill: '0x000000', boundsAlignH: 'center', boundsAlignV: 'middle'};


        let creditsBox = this.add.image(540, 700, 'creditsBox').setScale(1).setAngle(90);
        this.add.text(540, 450, "Programming", style).setOrigin(.5,.5).setDepth(1).setScale(0.7);
        this.add.text(540, 550, "John Perone", style3).setOrigin(.5,.5).setDepth(1).setScale(1);
        this.add.text(540, 625, "Brandon Hwu", style3).setOrigin(.5,.5).setDepth(1).setScale(1);
        this.add.text(540, 775, "Art and Writing", style).setOrigin(.5,.5).setDepth(1).setScale(0.7);
        this.add.text(540, 875, "Craig Schroeder", style3).setOrigin(.5,.5).setDepth(1).setScale(1);


        this.playButtonText = this.add.text(540, 1250, "Return", style).setOrigin(.5,.5).setDepth(1).setScale(0.8);
        this.playButtonBack = this.add.image(540, 1300, 'playButtonBack').setScale(1).setInteractive().on('pointerover', () => {
            this.playButtonText.setScale(0.8);
        }).on('pointerdown', () => {
            this.cameras.main.fadeOut("500");
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Title', {data: this.score});
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