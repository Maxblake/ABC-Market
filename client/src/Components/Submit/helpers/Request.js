import { request } from "../../../../fetching/wrapper";

export const newOffer = (body, cb) => {
    request('POST', '/product/offer/new', body)
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

export const newService = (body, cb) => {
    request('POST', '/product/service/new', body, 'json')
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
    request('POST', '/product/place/new', body)
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
    request('POST', '/product/vehicle/new', body)
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
    request('POST', '/product/article/new', body)
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