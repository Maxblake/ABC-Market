export const request =  (method, endpoint, params = {}, headers = 'formdata') => {
    return new Promise((res,rej) => {
        var body

        var fetchOptions = {
            method,
            body,
            credentials: 'include'
        }

        headers == 'json' ? (fetchOptions[headers] = 'application/json', body = JSON.stringify(params)) : headers
        headers == 'formdata' ? (body = params) : headers

        switch (method) {
            case 'GET':
                fetch(endpoint, {
                    credentials: 'include',
                })
                    .then(response => response.json())
                    .then(response => res(response))
                    .catch(err => rej(err.message) )
            break

            case 'POST':
                fetch(endpoint, fetchOptions)
                    .then(response => response.json())
                    .then(response => res(response) )
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