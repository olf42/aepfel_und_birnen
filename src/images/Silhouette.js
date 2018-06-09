import Phaser from 'phaser'

export default class {
    constructor (scene, x, y, img, scale, rgb) {
        this.scene = scene
        this.color = rgb

        this.originalTexture = this.scene.textures.get(img).getSourceImage()
        this.newTexture = this.scene.textures.createCanvas('imgnew', this.originalTexture.width, this.originalTexture.height)
    
        this.context = this.newTexture.getSourceImage().getContext('2d')
        this.context.drawImage(this.originalTexture, 0, 0)
    
        this.obj = this.scene.add.image(200, 100, 'imgnew')
    
        this.createSilhouette()
    }

    createSilhouette (originalTexture) {
        let pixels = this.context.getImageData(0, 0, this.originalTexture.width, this.originalTexture.height)

        for (let i = 0; i < pixels.data.length / 4; i++)
        {
            this.processPixel(pixels.data, i * 4, 0.1)
        }
    
        this.context.putImageData(pixels, 0, 0)
        this.newTexture.refresh()
    }

    processPixel (data, index) {
        data[index] = this.color[0]
        data[index + 1] = this.color[1]
        data[index + 2] = this.color[2]
    }
}
