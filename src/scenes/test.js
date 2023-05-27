class TestScene extends Phaser.Scene {
    constructor()
    {
        super('testScene');
    }
    
    preload()
    {

    }

    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width*.5, height*.5, 'INSERT GAME HERE!', { font: '"Press Start 2P"' });
    }

    
}