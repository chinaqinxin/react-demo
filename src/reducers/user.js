import actionType from '../actions/actionType'
const isLogin = (
    Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
)
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))
const initState = {
    // id:'',
    // displayName:'',
    // avatar:'',
    // role:'',
    // isLogin:false,
    ...userInfo,
    isLogin,
    isLoading:false
}

export default (state=initState,action)=>{
    switch(action.type){
        case actionType.START_LOGIIN:
            return {...state,isLoading:true}
        case actionType.LOGIN_SUCCESS:
            return {...state,...action.payload.userInfo,isLoading:false,isLogin:true}
        case actionType.LOGIN_FAILED:
            return {
                id:'',
                displayName:'',
                avatar:'',
                isLogin:false,
                isLoading:false,
                role:''
            }
        case actionType.CHANGE_AVATAR:
            return {...state,avatar:action.payload.avatarUrl}
        default:
            return state
    }
}