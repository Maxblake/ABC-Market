export const latestArticle = (cb) => {
    fetch('/product/article/latest')
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.products) : cb(false)
    })
}

export const latestPlace = (cb) => {
    fetch('/product/place/latest')
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.products) : cb(false)
    })
}

export const latestService = (cb) => {
    fetch('/product/service/latest')
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.products) : cb(false)
    })
}

export const latestOffer = (cb) => {
    fetch('/product/offer/latest')
    .then(response => response.json())
    .then(result => {
        (result.status == 200) ? cb(result.products) : cb(false)
    })
}

export const productImages = (id, cb) => {
    fetch(`/product/images/${id}`)
    .then(response => response.json()) 
    .then(result => {
        (result.status === 200) ? cb(result.images.product_images) : cb(false) 
    })
}

export const productDetail = (id, cb) => {
    fetch(`/product/detail/${id}`)
    .then(response => response.json()) 
    .then(result => {
        (result.status === 200) ? cb(result.product) : cb(false) 
    })
}

