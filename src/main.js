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
            debug: true,
        }
    },
    scene: [Game]
};

let game = new Phaser.Game(config);