import Http from "../../../fetching/wrapper";
const http = new Http()

export const latestArticle = cb => {
	http.request('/product/article/latest')
	.then(result => (result.status == 200) ? cb(result.products) : cb(false))
}

export const latestPlace = cb => {
	http.request('/product/place/latest')
	.then(result => (result.status == 200) ? cb(result.products) : cb(false))
}

export const latestService = cb => {
	http.request('/product/service/latest')
	.then(result => (result.status == 200) ? cb(result.products) : cb(false))
}

export const latestOffer = cb => {
	http.request('/product/offer/latest')
	.then(result => (result.status == 200) ? cb(result.products) : cb(false))
}

export const productImages = (id, cb) => {
	http.request(`/product/images/${id}`)
	.then(result => (result.status == 200) ? cb(result.images) : cb(false))
}

export const productDetail = (id, cb) => {
	http.request(`/product/detail/${id}`)
	.then(result => (result.status == 200) ? cb(result.product) : cb(false))
}

export const getSeller = (id, cb) => {
	http.request(`/product/contact/${id}`)
	.then(result => (result.status == 200) ? cb(result.contact) : cb(false))
}

export const newMessageFromProduct = (body, cb) => {
    http.request('/trade/new_message_from_product', 'POST', body, 'json')
    .then(result => (result.status == 200) ? cb(result.id) : cb(null) )
}

export const byCategory = (type, category, cb) => {
	http.request(`/product/${type}/category/${category}`)
	.then(result => (result.status == 200) ? cb(result.products) : cb(null) )
}

