import actionType from './actionType'

export const markNotificationsReadById = (id) =>{
    console.log(id,'ww')
    return dispatch => {
        setTimeout(()=>{
            dispatch({
                type:actionType.MAPK_NOTIFICATION_AS_READ_BY_ID,
                payload:{
                    id
                }
            })
        },2000)
    }
}

