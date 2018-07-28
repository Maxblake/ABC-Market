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
    .then(data => {
        if (data.status == 200) {
            cb(data.user)
        } else {
            cb(null)
        }
    })
}

export const isLogged = cb => {
    fetch('/checkSession', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        if (result.status == 200) {
            cb(result.user)      
        } else {
            cb(null)
        }
    })
}

export const logOut = cb => {
    fetch('logout', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        if (result.status == 200) {
            cb(true)      
        } else {
            cb(false)
        }
    })
}