import TrelloAPI from "../modules/trello-api";
import Config from "../config/config";
import appToday from "./today";
import appWeek from "./week";

const Vue = require('vue');

window.appMain = new Vue({
    el: '#main',
    data: {
        showConfigFlg: true,
        showAppFlg: false,
        showConfigErrFlg: false,
        showConfigWarnFlg: false,
        boards: []
    },
    mounted: function () {
        Config.getConfigFromUrl()
        if (Config.isSetUpConfig()) {
            this.startApp()
        }

    },
    methods: {
        startApp: function () {
            if (Config.isSetUpConfig()) {
                let trello = new TrelloAPI()
                trello.getBoards(this.getBoards, this.showErrConfig)
            } else {
                this.showWarnConfig()
            }
        },
        showApp: function () {
            this.showConfigFlg = false
            this.showAppFlg = true
            this.refreshApps()
        },
        showErrConfig: function () {
            this.showConfigErrFlg = true
        },
        showWarnConfig: function () {
            this.showConfigWarnFlg = true
        },
        showErr: function (error) {
            console.log(error)
        },
        getBoards: function (response) {
            // console.log(response.data)
            this.boards = response.data
            this.showApp()
        },
        refreshApps: function () {
            appToday()
            appWeek()
            this.setAuto()
        },
        refreshAll: function () {
            document.getElementById('today-refresh').click()
            document.getElementById('week-refresh').click()
        },
        refreshManual: function () {
            this.refreshAll()
        },
        refreshAuto: function () {
            this.refreshAll()
            this.setAuto()
        },
        setAuto:function() {
            setTimeout(this.refreshAuto, 1000 * 60);
        }
    }
})

