import server from './interceptor.js';


function ajax(url, data = {}, method = "GET") {
    return new Promise((resolve, reject) => {

        let promise = null;
        method = method.toUpperCase().trim();

        if (method === 'GET') {
            let str = '?';
            Object.keys(data).forEach((item) => {
                str += item + '=' + data[item] + '&';
            })
            str = str.substr(0, str.lastIndexOf('&'));
            promise = server.get(url + str);
        } else {
            promise = server({
                url: url,
                method: method,
                data: data
            })
        }
        promise.then((res) => {
            resolve(res)
        }, (err) => {


        })
    })
}

export default ajax;