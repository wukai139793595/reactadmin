import jsonp from 'jsonp';
import {
    message
} from 'antd';
import ajax from './ajax.js';
const baseUrl = '';
// 登录
export const login = (data) => ajax(baseUrl + '/login', data, 'POST');

// 根据分类ID获取分类
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

// 获取所有用户列表
export const reqUserList = () => ajax(baseUrl + '/manage/user/list')
// 获取角色列表
export const reqRoleList = () => ajax(baseUrl + '/manage/role/list')
// 更新用户
export const reqUpdateUser = (data) => ajax(baseUrl + '/manage/user/update', data, "POST")

// 添加用户
export const reqCreateUser = (data) => ajax(baseUrl + '/manage/user/add', data, "POST")

//  删除用户
export const reqRemoveUser = (data) => ajax(baseUrl + '/manage/user/delete', data, "POST")
// 添加角色
export const reqAddRole = (data) => ajax(baseUrl + '/manage/role/add', data, "POST")
//更新角色
export const reqUpdateRole = (data) => ajax(baseUrl + '/manage/role/update', data, "POST")

//获取产品信息
export const reqProducts = (data) => ajax(baseUrl + '/manage/product/list', data)

//根据ID/Name搜索产品分页列表
export const reqSearchProducts = (data) => ajax(baseUrl + '/manage/product/search', data)

// 根据分类ID获取分类
export const reqCategoryInfo = (data) => ajax(baseUrl + '/manage/category/info', data)

// 对商品进行上架/下架处理
export const reqUpdateStatus = (data) => ajax(baseUrl + '/manage/product/updateStatus', data, "POST")

// 获取一级或某个二级分类列表
export const reqCategoryList = (data) => ajax(baseUrl + '/manage/category/list', data)

// 删除图片
export const reqImgDelete = (data) => ajax(baseUrl + '/manage/img/delete', data, "POST")

// 添加商品
export const reqAddProduct = (data) => ajax(baseUrl + '/manage/product/add', data, "POST")

// 更新商品
export const reqUpdateProduct = (data) => ajax(baseUrl + '/manage/product/update', data, "POST")

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