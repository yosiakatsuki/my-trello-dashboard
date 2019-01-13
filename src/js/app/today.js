import TrelloAPI from "../modules/trello-api";
import Utility from "../modules/utility";

const Vue = require('vue');

export default function appToday() {
    const appToday = new Vue({
        el: '#today',
        data: {
            query: {
                today:'@me due:2 due:incomplete -label:P1',
                priority:'@me label:P1'
            },
            tempCards:[],
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
                this.dataExists = false
                this.trello.getSerchResult(this.query.priority, this.getPriorityTasks, this.showErr)
            },
            getPriorityTasks: function(response) {
                // console.log(response.data)
                this.tempCards = Utility.sortCards(response.data.cards)
                this.trello.getSerchResult(this.query.today, this.showTasks, this.showErr)
            },
            showTasks: function (response) {
                // console.log(response.data)
                this.cards = this.tempCards.concat(Utility.sortCards(response.data.cards))
                this.dataExists = true
            },
            showErr: function (error) {
                console.log(error)
            },
            showBoardName: function (id) {
                return Utility.getBoardHTML(id)
            },
            showDue: function (due, dueComplete) {
                return Utility.getDispDate(due,dueComplete)
            }
        }
    })
}

