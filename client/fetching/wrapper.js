export const request =  (method, endpoint, params = {}, headers = 'formdata') => {
    return new Promise((res,rej) => {

        var fetchOptions = {
            method,
            credentials: 'include'
        }

        headers == 'json' ? (fetchOptions['headers'] = {'Content-Type':'application/json'}, fetchOptions['body'] = JSON.stringify(params)) : headers
        headers == 'formdata' ? fetchOptions['body'] = params : headers
       
        switch (method) {
            case 'GET':
                fetch(endpoint, fetchOptions)   
                .then(response => response.json())
                .then(response => res(response))
                .catch(err => rej(err.message) )
            break

            case 'POST':
                fetch(endpoint, fetchOptions)
                .then(response => response.json())
                .then(response => res(response))
                .catch(err => rej(err.message) )
            break

            case 'DELETE':
                fetch(endpoint, fetchOptions)
                .then(response => response.json())
                .then(response => res(response) )
                .catch(err => rej(err.message) )
            break

            case 'UPDATE':
                fetch(endpoint, fetchOptions)
                .then(response => response.json())
                .then(response => res(response) )
                .catch(err => rej(err.message) )
            break
        }
    })
}