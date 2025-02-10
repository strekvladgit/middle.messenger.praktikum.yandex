const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
  
export type DataType = Record<string, string>;
  
export type Options = {
    method?: string,
    headers?: [string, string],
    data?: DataType | FormData,
    timeout?: number,
    retries?: number,
}
  
type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

function queryStringify(data: DataType | FormData): string {
    let result = '?';

    Object.entries(data).forEach(([key, value])=>{
        result += `${key}=${value.toString()}&`;
    })

    return result.slice(0, result.length - 1);
}
export default class HTTPTransport {
    private baseURL : string = 'https://ya-praktikum.tech/api/v2/';

    get: HTTPMethod = (url, options) => {
        let resUrl = url;
        const { data } = options;

        if (data) {
            if(!(data instanceof FormData)){
                resUrl = queryStringify(data);
            }
            
        }

        return this.request(`${this.baseURL}${resUrl}`, { ...options, method: METHODS.GET });
    };

    post: HTTPMethod = (url, options?) => {
        console.log(options)
        return this.request(`${this.baseURL}${url}`, { ...options, method: METHODS.POST });
    }

    put: HTTPMethod = (url, options) => {
        return this.request(`${this.baseURL}${url}`, { ...options, method: METHODS.PUT });
    }

    delete: HTTPMethod = (url, options) => {
        return this.request(`${this.baseURL}${url}`, { ...options, method: METHODS.DELETE });
    }

    request: HTTPMethod = (url, options) => {
        const {method, headers, data, timeout = 5000, } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if(method){
                xhr.open(method, url);
            } else {
                throw new Error('method required')
            }
            
            if (headers) xhr.setRequestHeader(...headers);

            
            xhr.onload = () => {
                if(xhr.status !== 200){
                    reject(new Error(xhr?.response?.reason))
                }
                resolve(xhr.response);
            };

            if (data instanceof FormData) {
                xhr.setRequestHeader('Accept', 'application/json');

            } else {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === METHODS.GET) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data));
            }

            setTimeout(() => {
                xhr.abort();
            }, timeout)
        })
    };
}



export function fetchWithRetry(url: string, options: Options): unknown {
    const { retries = 2 } = options;

    if (retries === 0) {
        throw new Error('The number of attempts has been exhausted');
    }

    return new HTTPTransport().get(url, options)
        .catch(() => fetchWithRetry(url, { ...options, retries: retries - 1 }))
}

