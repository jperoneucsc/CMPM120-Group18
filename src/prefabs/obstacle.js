class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Phaser.Math.Between(0, 1080), 2250, 'obstacle'); 
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityY(-velocity);            // make it go!
        this.setImmovable();                    
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning
    } 

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.y < 0) {
            // (recursively) call parent scene method from this context
            this.parentScene.addObstacle(this.parent, 500);
            this.newBarrier = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.y < -200) {
            this.destroy();
        } 
    }
}