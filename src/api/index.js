import jsonp from 'jsonp';
import {
    message
} from 'antd';
import ajax from './ajax.js';
const baseUrl = '';
// 登录
export const login = (data) => ajax(baseUrl + '/login', data, 'POST');

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(baseUrl + '/manage/category/list', {
    parentId
})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(baseUrl + '/manage/category/add', {
    categoryName,
    parentId
}, 'POST')

// 更新分类
export const reqUpdateCategory = ({
    categoryId,
    categoryName
}) => ajax(baseUrl + '/manage/category/update', {
    categoryId,
    categoryName
}, 'POST')




// 天气请求jsonp
export const receiveWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (err, data) => {
            if (err) {
                message.error('为获取到天气信息')
            } else {
                let {
                    weather,
                    dayPictureUrl
                } = data.results[0].weather_data[0];
                resolve({
                    weather,
                    dayPictureUrl
                })
            }
        })
    })
}