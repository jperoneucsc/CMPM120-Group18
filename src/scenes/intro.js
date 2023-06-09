class Intro extends Phaser.Scene {
    constructor() {
        super('Intro')
    }

    preload(){
        this.load.video("vid", "src/assets/intro/intro.mp4", true);
        this.load.image("fullscreenButton", "src/assets/titlemenu/fullscreenToggle.png");
    }

    create() {
        this.cameras.main.fadeIn(2000);
        this.iterable = false;



        this.video = this.add.video(540, 1920/2, 'vid').setOrigin(.5,.5).setScale(8);
        
        this.fullscreenButton = this.add.image(75, 75, 'fullscreenButton').setScale(2).setInteractive().on('pointerover', () => {
        }).on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        this.cameras.main.on('camerafadeincomplete', () => {
            this.video.play();
        });

        this.video.on('complete', () => { 
            console.log('Video complete.');
            this.cameras.main.fadeOut(2000);
        });

        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.scene.start('Title', {sound: this.soundToggle});
        });
    }

    update(){
        this.input.keyboard.on('keydown', () => {
            if(this.iterable == false){
                this.iterable = true;
                this.video.stop()
                this.cameras.main.fadeOut(500);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Title', {sound: this.soundToggle});
            });   
            }
        })
        this.input.on('pointerdown', () => {
            if(this.iterable == false){
                this.iterable = true;
                this.video.stop()
                this.cameras.main.fadeOut(500);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Title', {sound: this.soundToggle});
            });   
            }
        })

    }
}