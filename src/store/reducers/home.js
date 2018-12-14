//一个页面一个reducer
import * as Types from '../action-types';
let initState={
    currentLesson:'all',
    sliders:[],
    lesson:{
        list:[],//课程的所有数据
        hasMore:true,//默认有更多
        offset:0,//从第0条开始获取
        limit:5,//限制一次获取的条数
        isLoading:false//默认没有正在加载
    }
};
function home(state=initState,action){
    switch (action.type){
        case Types.SET_CURRENT_LESSON:
            //dispatch({type:SET_CURRENT_LESSON,LESSON:'REACT'})
            return {...state, currentLesson:action.lesson};
        case Types.SET_SLIDERS:
            return {...state,sliders:action.payload};
        case Types.CHANGE_LOADING_STATUS:
            return {...state,lesson:{...state.lesson,isLoading:action.status}};
        case Types.SET_LESSONS:

            return {...state,lesson:{...state.lesson,isLoading:false,offset:state.lesson.offset+action.payload.list.length,hasMore:action.payload.hasMore,list:[...state.lesson.list,...action.payload.list]}};
        case Types.CLEAR_LESSONS:
            return {...state,lesson:{...state.lesson,isLoading:false,offset:0,list:[],hasMore:true}}
    }
    return state;
}
export default home;