import Http from "../../fetching/wrapper";
const http = new Http()

export const logIn = (body, cb) => {
    http.request('/login', 'POST', body, 'json').then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const isLogged = cb => {
    http.request('/checkSession').then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const logOut = cb => {
    http.request('/logout').then(result => {
        (result.status == 200) ? cb(true) : cb(false)
    })
}

export const signUp = (body, cb) => {
    http.request('/users/new', 'POST', body, 'json').then(result => {
        (result.status == 200) ? cb(true) : cb(null)
    })
}

export const getSession = (cb) => {
    http.request('/checkSession').then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const chatHistory = (trade_id, cb) => {
    http.request(`/trade/history/${trade_id}`).then(data => {
        let hist = []
        const messages = data.messages
        for (var i in messages) {
            var { msg, id } = messages[i]
            hist.push({ msg, id })
        }
        cb(hist)
    })
}