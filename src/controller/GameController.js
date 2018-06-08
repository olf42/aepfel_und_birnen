
import { shuffle } from 'lodash'

export default class GameController {
    constructor () {

        this.facts = [
            "Als Vorfahre unseres Kulturapfels gilt eine Gen-Wildart (Malus sieversii), heute noch vorkommend in Kasachstan, in der Gegend um Alma Ata.",
            "Der Apfel gehört botanisch zur gleichen Familie wie beispielsweise die Birne, die Himbeere, die Kirsche und – die Rose!",
            "Bereits im antiken Persien galt der Apfel als Symbol herrschaftlicher Macht, eine Symbolik, die von den mittelalterlichen Kaisern weitergeführt wurde.",
            "Äpfel gedeihen in der Region um Bamberg sehr gut wegen des milden Klimas.",
            "Neben seinem Vitaminreichtum ist der Apfel auch in der Lage, die Darmtätigkeit zu regulieren.",
            "Innerhalb Europas produziert Polen mit 3,5 Millionen Tonnen die meisten Äpfel. Kurz darauf folgt Italien mit 2,4 Millionen Tonnen Äpfeln.",
            "Bei einem Unfall mit einem Kühllaster sind am späten Donnerstagabend mehrere Tonnen Äpfel über die A27 bei Verden gekullert."
        ]

        this.story = [
            "Wenn ich mir aus den wirklichen Äpfeln, Birnen, Erdbeeren, Mandeln \ndie allgemeine Vorstellung »Frucht« bilde, wenn ich weitergehe und mir \neinbilde, daß meine aus den wirklichen Früchten gewonnene abstrakte \nVorstellung »die Frucht« ein außer mir existierendes Wesen, ja das wahre \nWesen der Birne des Apfels etc. sei, so erkläre ich – spekulativ ausgedrückt \n– »die Frucht« für die »Substanz« der Birne, des Apfels, der Mandel etc.",
            "Ich sage also, der Birne sei es unwesentlich, Birne, dem Apfel sei \nes unwesentlich, Apfel zu sein. Das Wesentliche an diesen Dingen sei \nnicht ihr wirkliches, sinnlich anschaubares Dasein, sondern das von \nmir aus ihnen abstrahierte und ihnen untergeschobene Wesen, das Wesen \nmeiner Vorstellung,»die Frucht.«",
            "Ich erkläre dann Apfel, Birne, Mandel etc. für bloße Existenzweisen, \nModi »der Frucht.« Mein endlicher, von den Sinnen unterstützter Verstand \nunterscheidet allerdings einen Apfel von einer Birne und eine Birne von \neiner Mandel, aber meine spekulative Vernunft erklärt diese sinnliche \nVerschiedenheit für unwesentlich und gleichgültig.",
            "Sie sieht in dem Apfel dasselbe wie in der Birne und in der Birne \ndasselbe wie in der Mandel, nämlich »die Frucht.« Die besondern \nwirklichen Früchte gelten nur mehr als Scheinfrüchte, deren wahres \nWesen »die Substanz«, »die Frucht« ist."
        ]

        this.games = [
            {
                key: 'BouncyPearScene',
                title: 'Der Sprung',
                text: "bla"
            },
            {
                key: 'SearchScene',
                title: 'Die Suche',
                text: "bla"
            },
            {
                key: 'DdrScene',
                title: 'Der Tanz',
                text: "bla"
            }                        
        ]

        this.score = 0
        this.level = 1
        this.scenes = shuffle(this.games)
    }

    currentScene () {
        return this.scenes[0]
    }

    nextScene () {
        console.log(this.scenes)
        if (this.scenes.length > 1) {
            this.level += 1
            const scene = this.scenes[0]
            this.scenes.shift()
            return 'InstructionScene'
        }
        else {
            return 'EndScene'
        }
    }
}