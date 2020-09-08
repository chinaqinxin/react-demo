import actionTypes from '../actions/actionType'
const initState = {
    isLoading : false,
    list:[{
        id:1,
        title:'lorem ipsum dolor sit 1111',
        desc:'111111111111',
        hashRead:false
    },{
        id:2,
        title:'22222',
        desc:'3333333',
        hashRead:false
    }]
}

export default (state = initState,action)=>{
    switch(action.type){
        case actionTypes.START_NOTIFICATION_POST:
            return {...state,isLoading:true}
        case actionTypes.FINISH_NOTIFICATION_POST:
            return {...state,isLoading:false}
        case actionTypes.RECIVED_NOTIFICATIONS:
            return {...state,list:action.payload.list}
        case actionTypes.MAPK_NOTIFICATION_AS_READ_BY_ID:
            const newList= state.list.map((item)=>{
                if(item.id === action.payload.id){
                    item.hashRead = true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
            return {
                ...state,
                list:state.list.map((item)=>{
                    item.hashRead = true
                    return item
                })
            }
        default:
            return state
    }
}