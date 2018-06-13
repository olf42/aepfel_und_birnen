export const addBouncyObstacle = (scene, x, y, image, scale, veloX, veloY) => {
    const pear = scene.matter.add.image(x, y, image)
    pear.setBody({
        type: 'circle',
        radius: 70
    })      
    pear.setScale(scale).setDepth(20) 
    pear.setFriction(0)
    pear.setVelocityY(veloY)
    pear.setVelocityX(veloX)
    pear.setFrictionAir(0.012)
    pear.setBounce(2)

    return pear
}

export const addStaticObstacle = (scene, x, y, image, scale) => {
    const pear = scene.matter.add.image(x, y, image, null, { isStatic: true, })
    pear.setBody({
        type: 'circle',
        radius: 70
    })     
    pear.setScale(scale).setStatic(true).setDepth(20) 
    return pear
}

export const addTweenObstacle = (scene, x, y, image, scale, xGoal, yGoal, duration) => {
    const pear = scene.matter.add.image(x, y, image)
    pear.setBody({
        type: 'circle',
        radius: 70
    })
    pear.setScale(scale).setIgnoreGravity(true)
    pear.setFrictionAir(0).setDepth(20) 
    scene.tweens.add({
        targets: pear,
        x: x+xGoal,
        y: y+yGoal,
        duration: duration,
        repeat: -1,
        ease: 'Power2',
        yoyo: true
    })
    return pear
}

export const addPlatform = (scene, x, y) => {
    const pf = scene.matter.add.image(x, y, 'ground_s')
    pf.setStatic(true)
    pf.setFriction(0).setDepth(15) 
    return pf
}

export const checkCollision = (bodyA, bodyB, targetA, targetsB) => {
    // check collision -> bodyA and bodyB are the bodies retuned by the event;
    // targetA (single object) and targetsB (list of objects) are gameobjects to check for collision 
    if (bodyA ===targetA.body || bodyB === targetA.body) {
        for (const target of targetsB) {
            if (target.body) {
                if (bodyA === target.body || bodyB === target.body) {
                    return true
                }
            }
        }
    }
    return false  
}

export const addCloudEmitter = (scene, init=true) => {
    
    let particles = scene.add.particles('cloud01');

    particles.createEmitter({
        x: { min: 1400, max: 2500 },
        scale: { min: 0.6, max: 0.8},
        alpha: 0.3,
        y: { min: 0, max: 4500 },
        lifespan: 500000,
        speedX: { min: -10, max: -20 },
        quantity: 2,
        frequency: 650,
        depth: -15
        //delay: {min: 100, max: 400}
    })

    // populate screen with clouds
    if (init) {
        for (let i = 0; i < Phaser.Math.Between(25,35); i++) {
            particles.emitParticleAt(Phaser.Math.Between(-100, 1300), Phaser.Math.Between(0, 600) )
        }
    }

    return particles
}