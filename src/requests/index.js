import axios from 'axios'
import {message} from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL : isDev ? 'http://rap2.taobao.org:38080/app/mock/248256' : ''
})

service.interceptors.request.use((config) => {
    config.data = Object.assign({},config.data,{
        // authToken:window.localStorage.getItem('authToken')
        authToken:'sadsadas'
    })
    return config
})

service.interceptors.response.use((resp)=>{
    if(resp.data.code === 200){
        return resp.data.data
    }else{
        // 全局处理错误
        message.error(resp.data.errMsg)
    } 
})
// const adata={
//     offset:0,
//     limited:10
// }
// export const getArticles = (data=adata) => {
export const getArticles = (offset=0,limited=10) => {
    // return new Promise((resolve) => {
    //     resolve(service.post('/api/v1/articleList',{ 
    //         // offset:data.offset,
    //         // limited:data.limited
    //         offset,
    //         limited
    //      })
    //      )
    //   })
    return service.post('/api/v1/articleList')
      
}

