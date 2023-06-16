let config ={
    type: Phaser.AUTO,
    width: 1080,
    height: 1920,
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
        }
    },
    audio: {
        disableWebAudio: false // Enable Web Audio API if available
    },
    scene: [Intro, Title, Game, Credits]
};

let game = new Phaser.Game(config);