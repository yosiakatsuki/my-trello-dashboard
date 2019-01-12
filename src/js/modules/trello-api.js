import Config from "../config/config";

const axios = require('axios');

export default class TrelloAPI {
    constructor() {
        this.key = Config.getApiKey()
        this.token = Config.getToken()
        this.query = Config.getQueryString()
    }

    createURL(url) {
        let str = '?'
        if (url.indexOf('?') !== -1) {
            str = '&'
        }
        return `${url}${str}${this.query}`
    }

    getData(endpoint, success, failed) {
        let conf = Config.isSetUpConfig()
        if (!conf) {
            console.log('APIキーとトークンが足りません')
            return false;
        }
        axios.get(this.createURL(endpoint))
            .then(function (response) {
                success(response)
            })
            .catch(function (error) {
                if (failed != null) {
                    failed(error)
                }
            })
    }

    createSearchUrl(query) {
        query = encodeURIComponent(query)
        let endpoint = `https://api.trello.com/1/search?query=${query}`
        // console.log('query:' + endpoint)
        return endpoint
    }

    checkRequest(success, failed) {
        let endpoint = 'https://api.trello.com/1/members/me/boards'
        this.getData(endpoint, success, failed)
    }

    /**
     * ボード一覧取得
     *
     * @param func
     */
    getBoards(success, failed) {
        let endpoint = 'https://api.trello.com/1/members/me/boards'
        this.getData(endpoint, success, failed)
    }

    getBoardName(id,success, failed) {
        let endpoint = `https://api.trello.com/1/boards/${id}`
        this.getData(endpoint, success, failed)
    }

    getSerchResult(query, success, failed) {
        this.getData(this.createSearchUrl(query), success, failed)
    }
    getSerchResultWithBoardName(query, boardName, success, failed) {
        query = `${query} board:${boardName}`
        // console.log('getSerchResultWithBoardName query:' + query)
        this.getSerchResult(query, success, failed)
    }
}