const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};
  
  
type Options = {
    method: string,
    headers?: [string, string],
    data?: [string, string][],
    timeout?: number,
    retries?: number,
}
  
type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

function queryStringify(data: [string, string][]): string {
    let result = '?';

    Object.entries(data).forEach(([key, value])=>{
        result += `${key}=${value.toString()}&`;
    })

    return result.slice(0, result.length - 1);
}

export default class HTTPTransport {
get: HTTPMethod = (url, options) => {
    let resUrl = url;
    const { data } = options;

    if (data) {
    resUrl = queryStringify(data);
    }

    return this.request(resUrl, { ...options, method: METHODS.GET });
};

post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST });
}

put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
}

delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
}

request: HTTPMethod = (url, options) => {
    const {method, headers, data, timeout = 5000, } = options;

    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (headers) xhr.setRequestHeader(...headers);

    xhr.onload = () => {
        resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (method === METHODS.GET) {
        xhr.send();
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

