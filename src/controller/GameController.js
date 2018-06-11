
import { shuffle, sample } from 'lodash'

export default class GameController {
    constructor () {

        this.facts = [
            "Als Vorfahre unseres Kulturapfels gilt eine Gen-Wildart (Malus \nsieversii), heute noch vorkommend in Kasachstan, in \nder Gegend um Alma Ata.",
            "Der Apfel gehört botanisch zur gleichen Familie wie beispielsweise \ndie Birne, die Himbeere, die Kirsche und – die Rose!",
            "Bereits im antiken Persien galt der Apfel als Symbol  \nherrschaftlicher Macht, eine Symbolik, die von den \nmittelalterlichen Kaisern weitergeführt wurde.",
            "Äpfel gedeihen in der Region um Bamberg sehr gut wegen des \nmilden Klimas.",
            "Neben seinem Vitaminreichtum ist der Apfel auch in der Lage, \ndie Darmtätigkeit zu regulieren.",
            "Innerhalb Europas produziert Polen mit 3,5 Millionen Tonnen die \nmeisten Äpfel. Kurz darauf folgt Italien mit 2,4 Millionen Tonnen.",
            "Bei einem Unfall mit einem Kühllaster sind am 21. Juli 2017 \nmehrere Tonnen Äpfel über die A27 bei Verden gekullert."
        ]

        this.story = [
            "Wenn ich mir aus den wirklichen Äpfeln, Birnen, \nErdbeeren, Mandeln die allgemeine Vorstellung \n»Frucht« bilde, wenn ich weitergehe und mir einbilde, \ndaß meine aus den wirklichen Früchten gewonnene \nabstrakte Vorstellung »die Frucht« ein außer mir \nexistierendes Wesen, ja das wahre Wesen der Birne des \nApfels etc. sei, so erkläre ich – spekulativ ausgedrückt \n– »die Frucht« für die »Substanz« der Birne, des Apfels, \nder Mandel etc.",
            "\nIch sage also, der Birne sei es unwesentlich, Birne, \ndem Apfel sei es unwesentlich, Apfel zu sein. Das \nWesentliche an diesen Dingen sei nicht ihr wirkliches, \nsinnlich anschaubares Dasein, sondern das von mir \naus ihnen abstrahierte und ihnen untergeschobene \nWesen, das Wesen meiner Vorstellung,»die Frucht.«",
            "\nIch erkläre dann Apfel, Birne, Mandel etc. für bloße \nExistenzweisen, Modi »der Frucht.« Mein endlicher, \nvon den Sinnen unterstützter Verstand unterscheidet \nallerdings einen Apfel von einer Birne und eine Birne \nvon einer Mandel, aber meine spekulative Vernunft \nerklärt diese sinnliche Verschiedenheit für unwesentlich \nund gleichgültig.",
            "Sie sieht in dem Apfel dasselbe wie in der Birne und \nin der Birne dasselbe wie in der Mandel, nämlich »die \nFrucht.« Die besondern wirklichen Früchte gelten nur \nmehr als Scheinfrüchte, deren wahres Wesen \n»die Substanz«, »die Frucht« ist."
        ]

        this.games = [
            {
                key: 'BouncyPearScene',
                title: 'Der Sprung',
                text: "bla",
                control: "Bringe den Apfel in den Topf\nBeschleunige mit schnellen Tab oder Klick; Sprung mit langem Tab o. Klick "
            },
            {
                key: 'SearchScene',
                title: 'Die Suche',
                text: "bla",
                control: "Finde die Birne unter den ganzen Äpfel\n Tab/Klicke auf die Birne"
            },
            {
                key: 'DdrScene',
                title: 'Der Tanz',
                text: "bla",
                control: "Drücke die entsprechende Taste (a, s, d) im Takt der Musik"
            }                        
        ]

        this.score = 0
        this.level = 1
        this.scenes = shuffle(this.games)
    }

    randomFact () {
        return sample(this.facts)
    }

    currentScene () {
        return this.scenes[0]
    }

    nextScene () {
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