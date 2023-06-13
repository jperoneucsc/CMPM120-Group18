class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, obst) {
        // call Phaser Physics Sprite constructor
        if(Phaser.Math.Between(0,1) == 0){
            super(scene, 50, 2400, obst);
        } else super(scene, 1025, 2400, obst);
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityY(-velocity);            // make it go!
        this.setImmovable();                    
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning
        this.setScale(.8);
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

        if(this.parentScene.is_gameover == true){
            this.setVelocityY(0);
        }
    }
}