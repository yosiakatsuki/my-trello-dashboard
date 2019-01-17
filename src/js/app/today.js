import TrelloAPI from "../modules/trello-api";
import Utility from "../modules/utility";

const Vue = require('vue');

export default function appToday() {
    const appToday = new Vue({
        el: '#today',
        data: {
            queryList: [
                '@me due:2 due:incomplete -label:P1',
                '@me label:P1',
                '@me due:overdue -label:P1'
            ],
            query: '',
            tempCards: [],
            cards: [],
            trello: null,
            dataExists: false,
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
            initRefresh: function () {
                this.initTrello()
                this.cards = []
                this.dataExists = false
                this.query = ''
            },
            refresh: function () {
                this.initRefresh()
                for (let i = 0; i < this.queryList.length; i++) {
                    this.query = this.queryList[i]
                    this.doFuncCount = Utility.doFuncAllBoard(this.getSerchResult)
                }

            },
            getSerchResult(board, num) {
                this.trello.getSerchResultWithBoardName(this.query, board.name, this.concatCards, this.showErr)
            },
            concatCards: function (response) {
                if ('cards' in response.data) {
                    this.cards = this.cards.concat(response.data.cards)
                    this.showTasks()
                }
            },
            showTasks: function () {
                // console.log(response.data)
                this.cards = Utility.sortCards(this.cards)
                this.dataExists = true
            },
            showErr: function (error) {
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

