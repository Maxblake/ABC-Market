export const newOffer = (body, cb) => {
    fetch('/product/offer/new', {
        method: 'POST',
        credentials: 'include',
        body
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(true) : cb(false)
    })
}

export const newService = (body, cb) => {
    fetch('/product/service/new', {
        method: 'POST',
        credentials: 'include',
        body
    })
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(true) : cb(false)
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
        (result.status == 200) ? cb(true) : cb(false)
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
        (result.status == 200) ? cb(true) : cb(false)
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
        (result.status == 200) ? cb(true) : cb(false)
    })
}