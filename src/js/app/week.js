import TrelloAPI from "../modules/trello-api";
import Utility from "../modules/utility";

const Vue = require('vue');

export default function appWeek() {
    const appWeek = new Vue({
        el: '#week',
        data: {
            query: '@me due:7 due:incomplete',
            cards: [],
            trello: null,
            dataExists: false,
            countBoards: 0,
            doFuncCount: 0
        },
        created: function () {
            this.refresh()
        },
        methods: {
            initTrello: function () {
                if (this.trello === null) {
                    this.trello = new TrelloAPI()
                }
            },
            refresh: function () {
                this.initTrello()
                this.cards = []
                this.dataExists = false
                this.countBoards = 0
                this.doFuncCount = Utility.doFuncAllBoard(this.getSerchResult)
            },
            getSerchResult(board, num) {
                this.trello.getSerchResultWithBoardName(this.query,board.name,this.concatCards, this.showErr)
            },
            concatCards: function (response) {
                ++this.countBoards
                if ('cards' in response.data) {
                    this.cards = this.cards.concat(response.data.cards)
                    if (this.countBoards === this.doFuncCount) {
                        this.showTasks()
                    }
                }
            },
            showTasks: function () {
                // console.log(response.data)
                this.cards = Utility.sortCards(this.cards)
                this.dataExists = true
            },
            showErr: function (error) {
                ++this.countBoards
                console.log(error)
            },
            showBoardName: function (id) {
                return Utility.getBoardHTML(id)
            },
            showDue: function (due, dueComplete) {
                return Utility.getDispDate(due, dueComplete)
            }
        }
    })
}

