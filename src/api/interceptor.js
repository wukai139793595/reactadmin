import Axios from 'axios';
import {
    message
} from 'antd';

const server = Axios.create();
server.interceptors.request.use((config) => {

    return config
}, (err) => {
    console.log(err)
})


server.interceptors.response.use((response) => {

    return response.data
}, (err) => {
    console.log('err', err)
    message.error('网络错误', 3)
    return Promise.reject(err)
})

export default server;