import axios from 'axios'
import {message} from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL : isDev ? 'http://rap2api.taobao.org/app/mock/248256' : ''
})

const servicelog = axios.create({
    baseURL : isDev ? 'http://rap2api.taobao.org/app/mock/248256' : ''
})

service.interceptors.request.use((config) => {
    config.data = Object.assign({},config.data,{
        // authToken:window.localStorage.getItem('authToken')
        authToken:'sadsadas'
    })
    return config
})

service.interceptors.response.use((resp)=>{
    // console.log(resp)
    if(resp.data.code === 200){
        return resp.data.data
    }else{
        // 全局处理错误
        message.error(resp.data.errMsg)
    } 
})




//获取文章列表
// const adata={
//     offset:0,
//     limited:10
// }
// export const getArticles = (data=adata) => {
export const getArticles = (offset=0,limited=10) => {
    return new Promise((resolve) => {
        resolve(service.post('/api/v1/articleList',{ 
            // offset:data.offset,
            // limited:data.limited
            offset,
            limited
         })
         )
      })
    // return service.post('/api/v1/articleList')
      
}

// 删除文章
export const deleteArticle = (id) =>{
    return service.post(`/api/v1/articleDelete/${id}`)
}

// 通过id获取文章
export const getArticleById = (id) => {
    return service.post(`/api/v1/article/${id}`)
}

// 保存文章
export const saveArticle = ( id,data ) => {
    return service.post(`/api/v1/articleeditor/${id}`,data)
} 

// 获取阅读量
export const saveArticleAmount = () =>{
    return service.post('/api/v1/articleAmount')
}

// 获取通知列表
 export const getNotifications = () =>{
     return service.post('/api/v1/notifications')
 }

//  登陆
export const loginRequest = (userInfo) =>{
    return servicelog.post('/api/v1/login',userInfo)
}