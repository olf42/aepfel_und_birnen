import { sample } from 'lodash'

export default class {
    constructor () {
        this.songAssets = {
            "menu": "./assets/music/aub_menu.mp3",
            "120bpm": "./assets/music/120bpm.mp3",
            "ddr": "./assets/music/aub_mk1.mp3",
            "credits": "./assets/music/aub_credits.mp3"
        }
        this.soundAssets = {
            "tiegel1": "./assets/sounds/tiegel1.mp3",
            "tiegel2": "./assets/sounds/tiegel2.mp3",
            "tiegel3": "./assets/sounds/tiegel3.mp3",
        }
    }

    load (scene) {
        for (const [title, asset] of Object.entries(this.songAssets)) {
            scene.load.audio(title, asset)
        }
        for (const [title, asset] of Object.entries(this.soundAssets)) {
            scene.load.audio(title, asset)
        }
    }

    play (scene, song) {
        if (song != this.currentSongTitle) {
            if (this.currentSong) {
                this.currentSong.stop()
            }
            this.currentSongTitle = song
            this.currentSong = scene.sound.add(song)
            this.currentSong.play()
        }
        return this.currentSong
    }

    randomSound (scene ) {
        const keys = Object.keys(this.soundAssets)
        console.log(sample(keys))
        //this.soundEffect = scene.sound.add(sample(keys), { loop: false })
        //this.soundEffect.play({duration: 1.0})
        //scene.sound.play(sample(keys), {start: 3, duration: 1.0})
    }
}