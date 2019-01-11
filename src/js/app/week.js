import TrelloAPI from "../modules/trello-api";
import Utility from "../modules/utility";

const Vue = require('vue');

export default function appWeek() {
    const appWeek = new Vue({
        el: '#week',
        data: {
            query: '@me due:7 due:incomplete -is:archived',
            cards: [],
            trello: null,
            dataExists: false
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
                this.trello.getSerchResult(this.query, this.showTasks, this.showErr)
            },
            showTasks: function (response) {
                // console.log(response.data)
                this.cards = Utility.sortCards(response.data.cards)
                this.dataExists = true
            },
            showErr: function (error) {
                console.log(error)
            },
            getBoardName: function (id) {
                return Utility.getBoardName(id)
            },
            showDue: function (due, dueComplete) {
                return Utility.getDispDate(due, dueComplete)
            }
        }
    })
}

