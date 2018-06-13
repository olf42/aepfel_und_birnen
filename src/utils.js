import Phaser from 'phaser'

/*
sections range between :min: and :max: into :count: parts with :spacing:
selects a random number in each part
*/
export const randomSpacedValues = (min, max, count, spacing) => {
    // equal distribution
    const step = (Math.floor(max - min) / count)

    // check if enough space is available
    let availableSpace = max - min - spacing * (count - 1)
    if (availableSpace < 0) 
        return false

    let values = []
    //generate spaced values array
    for (let i = 0; i < count; i++) {
        values[i] = min + Phaser.Math.Between(i * step + spacing/2, (i + 1) * step - spacing/2)
    }
    return values
} 

/*
Returns a random color from the hsv color wheel
*/
export const randomColor = () => {
    const hsv = Phaser.Display.Color.HSVColorWheel()
    return hsv[Phaser.Math.Between(0,359)].color
}