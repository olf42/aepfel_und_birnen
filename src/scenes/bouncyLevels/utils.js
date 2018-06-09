import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";

export const addBouncyObstacle = (scene, x, y, image, scale, veloX, veloY) => {

    const pear = scene.matter.add.image(x, y, image)
    pear.setBody({
        type: 'circle',
        radius: 70
    })      
    pear.setScale(scale)  
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
    pear.setScale(scale).setStatic(true)
    return pear
}

export const addTweenObstacle = (scene, x, y, image, scale, xGoal, yGoal, duration) => {
    const pear = scene.matter.add.image(x, y, image)
    pear.setBody({
        type: 'circle',
        radius: 70
    })
    pear.setScale(scale).setIgnoreGravity(true)
    pear.setFrictionAir(0)
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
    pf.setFriction(0)
    return pf
}

export const checkCollision = (bodyA, bodyB, targetA, targetsB) => {
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

