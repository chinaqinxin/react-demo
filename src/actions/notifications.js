import actionType from './actionType'
import {getNotifications} from '../requests'

const startPost = () => {
    return {
        type:actionType.START_NOTIFICATION_POST
    }
}

const finshPost = () =>{
    return {
        type:actionType.FINISH_NOTIFICATION_POST
    }
}


// 标记为已读
export const markNotificationsReadById = (id) =>{
    return dispatch => {
        dispatch(startPost())
        setTimeout(()=>{
            dispatch({
                type:actionType.MAPK_NOTIFICATION_AS_READ_BY_ID,
                payload:{
                    id
                }
            })
            dispatch(finshPost())
        },2000)
    }
}
// 全部标记为已读
export const markAllNotificationsAsRead= () =>{
    return dispatch => {
        dispatch(startPost())
        setTimeout(()=>{
            dispatch({
                type:actionType.MARK_ALL_NOTIFICATION_AS_READ,
            })
            dispatch(finshPost())

        },2000)
    }
}


const actionnitificationlist = (payload) => {
    return {
        type:actionType.RECIVED_NOTIFICATIONS,
        payload
    }
}

export const getNotificationList = () => dispatch =>{
        dispatch(startPost())
        getNotifications().then(resp =>{
            dispatch(actionnitificationlist({list : resp.list}))
            dispatch(finshPost())
        })
}
