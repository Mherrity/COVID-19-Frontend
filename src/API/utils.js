const baseURL='http://localhost:5000'

export const executeQueryPOST = (url) => 
    fetch(baseURL+url,
        {method: 'POST',
           'Content-Type': 'application/json',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': baseURL,
                'Access-Control-Allow-Credentials': 'true',
                'Accept': 'application/json'
            },
            credentials: 'include',
            withCredentials: 'true',
        })
    .then((resp)=>resp.json())
    .catch(_=>alert('SOMETHINF WENT WRONG'))