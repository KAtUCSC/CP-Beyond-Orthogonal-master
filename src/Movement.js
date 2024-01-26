class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 300
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })

    }

    create() {
        //console.log('now in movement scene 👍')
        this.cameras.main.setBackgroundColor(0xdddddd)

        //animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })
        
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })

        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)

        this.player.body.setSize(32, 32).setOffset(8, 16)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        //console.log(cursors)
        //if you use the non vector method, then it makes you faster on diagonals
        //handle left and right
        if(cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
            //this.player.x -= this.PLAYER_VELOCITY
        } else if(cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
            //this.player.x += this.PLAYER_VELOCITY
        }

        //handle up and down
        if(cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
            //this.player.y -= this.PLAYER_VELOCITY
        } else if(cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
            //this.player.y += this.PLAYER_VELOCITY
        }

        playerVector.normalize()
        //directly manipulating x does weird sprite stuff when using physics
        //this.player.x += playerVector.x * this.PLAYER_VELOCITY
        //this.player.y += playerVector.y * this.PLAYER_VELOCITY

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)
    }
}