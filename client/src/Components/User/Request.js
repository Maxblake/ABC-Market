import Http from "../../../fetching/wrapper";
const http = new Http()

export const userProduct = (cb) => {
    http.request('product/by_user').then(data => {
        (data.status == 200) ? cb(data.products) : cb(null) 
    })
}

export const userContacts = (cb) => {
    http.request('/user/contacts').then(data => {
        (data.status == 200) ? cb(data.trades) : cb(null) 
    })   
}