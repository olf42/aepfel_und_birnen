import { sample } from 'lodash'

export default class {
    constructor () {
        this.songAssets = {
            "menu": "./assets/music/aub_menu.mp3",
            "120bpm": "./assets/music/120bpm.mp3",
            "ddr": "./assets/music/aub_mk1.mp3",
            "credits": "./assets/music/aub_credits.mp3"
        }
    }

    load (scene) {
        for (const [title, asset] of Object.entries(this.songAssets)) {
            scene.load.audio(title, asset)
        }
    }

    play (scene, song, loop=true) {
        if (song != this.currentSongTitle) {
            if (this.currentSong) {
                this.currentSong.stop()
            }
            this.currentSongTitle = song
            this.currentSong = scene.sound.add(song)
            this.currentSong.play({loop: true})
        }
        return this.currentSong
    }

}