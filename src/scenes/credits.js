class Credits extends Phaser.Scene {
    constructor() {
        super('Credits')
    }

    init(data, sound)
    {
        this.score = data.data;
        this.soundToggle = data.sound;
        this.sound.stopAll();
    }

    preload(){
        this.load.image("creditsBox", "src/assets/credits/creditsBox.png");
    }

    create() {
        // music
        this.song = this.sound.add('backgroundSong', {volume: 0.15});
        this.song.isPlaying = false;

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

        this.musicToggleButton = this.add.image(225, 75, 'musicToggleButton').setScale(2).setTint(0x999999).setInteractive().on('pointerdown', () => {
            if (this.soundToggle == true) {
                this.song.isPlaying = true;
                this.soundToggle = false;
            } else {
                this.song.isPlaying = false;
                this.soundToggle = true;
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
        this.add.text(540, 1050, "Audio From Pixabay.com", style).setOrigin(.5,.5).setDepth(1).setScale(0.4);


        this.playButtonText = this.add.text(540, 1250, "Return", style).setOrigin(.5,.5).setDepth(1).setScale(0.8);
        this.playButtonBack = this.add.image(540, 1300, 'playButtonBack').setScale(1).setInteractive().on('pointerover', () => {
            this.playButtonText.setScale(0.8);
        }).on('pointerdown', () => {
            this.cameras.main.fadeOut("500");
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.song.stop();
                this.scene.start('Title', {data: this.score, sound: this.soundToggle});
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

    update(){
        if (this.soundToggle == false && this.song.isPlaying == true){
            this.song.stop();
            this.song.isPlaying = false;
            this.musicToggleButton.setTint(0x222222);
        }
        if (this.soundToggle == true && this.song.isPlaying == false){
            this.song.play();
            this.musicToggleButton.setTint(0x999999);
        }
    }
}