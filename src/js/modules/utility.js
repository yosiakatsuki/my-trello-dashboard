export default class Utility {
    static getDispDate(due, dueComplete) {
        let result = ''
        let icon = '<i class="far fa-clock mr-1"></i>'
        if (dueComplete) {
            result = `${icon}完了`

        } else if (due !== '') {
            let dueDate = new Date(due)
            let year = dueDate.getFullYear()
            let month = ('00' + (dueDate.getMonth() + 1)).slice(-2)
            let day = ('00' + dueDate.getDate()).slice(-2)
            let h = ('00' + dueDate.getHours()).slice(-2)
            let m = ('00' + dueDate.getMinutes()).slice(-2)
            let format = `${year}/${month}/${day} ${h}:${m}`
            if( dueDate > new Date() ) {
                result = `${icon}${format}`
            } else {
                result = `<span class="over-due">${icon}${format}</span>`
            }
        } else {
            result = `${icon}なし`
        }
        return result
    }
    static sortCards(cards) {
        cards.sort(function (a, b) {
            if (a.due === '') return -1;
            if (a.due < b.due) return -1;
            if (a.due > b.due) return 1;
            return 0;
        });
        return cards
    }
    static getBoardName(id) {
        let board = window.appMain.boards.filter(board => {
            return board.id === id
        })
        // console.log(board)
        return board[0].name
    }
}