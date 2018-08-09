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