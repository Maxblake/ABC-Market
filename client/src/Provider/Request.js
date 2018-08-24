export const logIn = (username, password, cb) => {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const isLogged = cb => {
    fetch('/checkSession', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const logOut = cb => {
    fetch('/logout', {
        credentials: 'include'
    })
    .then(result => {
        (result.status == 200) ? cb(true) : cb(false)
    })
}

export const signUp = (name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address, cb) => {
    fetch('/signup', {
        method: 'POST',
        headers: {
        'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, lastname, username, code, phoneNumber, password, gender, type, birthDate, address })
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const getSession = (cb) => {
    fetch('/checkSession', {
        'credentials': 'include'
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.user) : cb(null)
    })
}

export const chatHistory = (trade_id, cb) => {
    fetch(`/trade/history/${trade_id}`)
        .then(response => response.json())
        .then(data => {
            let hist = []
            const messages = data.messages
            for (var i in messages) {
                var { msg, id } = messages[i]
                hist.push({ msg, id })
            }
            cb(hist)
        })
}