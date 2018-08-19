export const userProduct = (cb) => {
    fetch('product/by_user', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        (data.status == 200) ? cb(data.products) : cb(null) 
    })
}

export const userContacts = (cb) => {
    fetch('/user/contacts', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        (data.status == 200) ? cb(data.contacts) : cb(null) 
    })   
}