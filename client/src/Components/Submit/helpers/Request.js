export const newOffer = (body, cb) => {
    fetch('/product/offer/new', {
        method: 'POST',
        credentials: 'include',
        body
    })
    .then(response => response.json())
    .then(result => {
        switch(result.status) {
            case 200:
                cb('Sale uploaded')
            break
            case 400:
                cb('Problem uploading pictures, check your internet conection')
            break
            case 404:
                cb('Problem adding picture img to database')
            break
            case 500:
                cb('Problem creating sale')
            break
        }
    })
}

export const newService = (title, category, post_time, description, location, cb) => {
    fetch('/product/service/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ title, category, post_time, description, location })
    })
    .then(response => response.json())
    .then(result => {
        switch(result.status) {
            case 200:
                cb('Service uploaded')
            break
            case 500:
                cb('Problem creating service')
            break
        }    
    })
}

export const newPlace = (body, cb) => {
    fetch('/product/place/new', {
        method: 'POST',
        credentials: 'include',
        body
    })
    .then(response => response.json())
    .then(result => {
        switch(result.status) {
            case 200:
                cb('Place uploaded')
            break
            case 400:
                cb('Problem uploading pictures, check your internet conection')
            break
            case 404:
                cb('Problem adding picture img to database')
            break
            case 500:
                cb('Problem creating place')
            break
        }    
    })
}

export const newVehicle = (body, cb) => {
    fetch('/product/vehicle/new', {
        method: 'POST',
        credentials: 'include',
        body
    })
    .then(response => response.json())
    .then(result => {
        switch(result.status) {
            case 200:
                cb('Vehicle uploaded')
            break
            case 400:
                cb('Problem uploading pictures, check your internet conection')
            break
            case 404:
                cb('Problem adding picture img to database')
            break
            case 500:
                cb('Problem creating vehicle')
            break
        }    
    })
}

export const newArticle = (body, cb) => {
    fetch('/product/article/new', {
        method: 'POST',
        credentials: 'include',
        body
    })
    .then(response => response.json())
    .then(result => {
        switch(result.status) {
            case 200:
                cb('Article uploaded')
            break
            case 400:
                cb('Problem uploading pictures, check your internet conection')
            break
            case 404:
                cb('Problem adding picture img to database')
            break
            case 500:
                cb('Problem creating article')
            break
        }
    })
}