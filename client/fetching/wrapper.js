class Http {

    call = (endpoint, fetchOptions, res, rej) => {
        fetch(endpoint, fetchOptions)   
        .then(response => response.json())
        .then(response => res(response))
        .catch(err => rej(err.message) )
    }

    request =  (endpoint, method = 'GET', params = {}, headers = 'formdata') => {
        return new Promise((res,rej) => {

            var fetchOptions = {
                credentials: 'include'
            }
            
            headers == 'json' ? (fetchOptions['headers'] = {'Content-Type':'application/json'}, fetchOptions['body'] = JSON.stringify(params)) : fetchOptions['body'] = params
            method != 'GET' ? (fetchOptions['method'] = method) : delete fetchOptions.body
    
            this.call(endpoint, fetchOptions, res, rej)           
        })
    }
}

export default Http