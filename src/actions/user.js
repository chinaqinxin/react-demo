import actionTypes from './actionType'
import {loginRequest} from '../requests'

const startLogin = ( ) =>{
    return {
        type:actionTypes.START_LOGIIN
    }
}

const loginSuccess = (userInfo) =>{
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{userInfo}
    }
}

const loginFailed = () =>{
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type:actionTypes.LOGIN_FAILED
    }
}

export const logoout = () =>{
    return dispatch=>{
        // 实际操作是请求后端接口告诉后端已经退出
        //  这块就是调用下清除authtoken的 function
        dispatch(loginFailed())
    }
}

export const login = (userInfo) => dispatch =>{
    dispatch(startLogin())
    loginRequest(userInfo).then(res=>{
        if(res.data.code === 200){
            // const {authToken,...userInfo} = res.data.data
            if(userInfo.remember === true){
                window.localStorage.setItem('authToken',res.data.data.authToken)
                window.localStorage.setItem('userInfo',JSON.stringify(res.data.data))
            }else{
                window.sessionStorage.setItem('authToken',res.data.data.authToken)
                window.sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
            }
            dispatch(loginSuccess({
                ...res.data.data
            }))
        }else{
            dispatch(loginFailed())
        }
    })
}