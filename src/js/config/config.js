export default class Config {

    /**
     * URLからKEY,TOKENを取得
     */
    static getConfigFromUrl() {
        let array = ''
        let url = window.location.search
        let hash = url.slice(1).split('&')
        for (var i = 0; i < hash.length; i++) {
            array = hash[i].split('=');
            if (array[0] === 'trello_apikey') {
                document.getElementById('trello_apikey').value = array[1]
            }
            if (array[0] === 'trello_token') {
                document.getElementById('trello_token').value = array[1]
            }
        }
    }

    static getApiKey() {
        return document.getElementById('trello_apikey').value
    }

    static getToken() {
        return document.getElementById('trello_token').value
    }

    /**
     * API叩くときのクエリストリングを作成
     * @returns {string}
     */
    static getQueryString() {
        let result = ''
        if (this.isSetUpConfig) {
            result = `key=${this.getApiKey()}&token=${this.getToken()}`
        }
        return result
    }

    /**
     * 設定の確認
     *
     * @returns {boolean}
     */
    static isSetUpConfig() {
        if (this.getApiKey() !== '' && this.getToken() !== '') {
            return true
        }
        return false
    }
}