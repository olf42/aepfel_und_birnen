/*
Simple solid color shader 
Displays only (white) silhouette of image
Can be tinted
*/


export default class extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
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
                if (texel.a > 0.0) {
                    texel = vec4(outTint.rgb * vec3(1.0,1.0,1.0), outTint.a);
                }
                gl_FragColor = texel;
            }

            `
        } )
    }
}