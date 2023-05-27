let config ={
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:1000 }
        }
    },
    scene: [Scene1]
};

let game = new Phaser.Game(config);