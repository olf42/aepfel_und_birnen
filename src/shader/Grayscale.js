export default class GrayScale extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor (game) {
        super( {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;
            varying vec4 outTint;

            void main() 
            {
                vec4 texel = texture2D(uMainSampler, outTexCoord);
                float gray = (texel.r + texel.g + texel.b) / 3.0;
                texel = vec4(outTint.rgb * gray, outTint.a*texel.a);
                gl_FragColor = texel;
            }

            `
        } )
    }
}