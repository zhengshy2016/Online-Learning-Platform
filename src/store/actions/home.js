import * as Types from '../action-types';
import {getSliders,getLessons} from '../../api/home';
let actions={
    updateCurrentLesson(lesson){
        //更新当前选择的课程
        return function(dispatch,getState){
            //更改课程类型
            dispatch({type:Types.SET_CURRENT_LESSON,lesson});
            //之后清空数据，并且根据当前的类型从新获取内容。
            actions.refreshAPI()(dispatch,getState);
        }
    },
    getSlidersAPI(){
        return function(dispatch,getState){//redux-thunk
            dispatch({type:Types.SET_SLIDERS,payload:getSliders()});
            //redux-promise的用法 可以将payload 的promise执行，执行后将内容放到action.payload中进行派发{type:'SET_SLIDERS',payload:[{},{},{}]}
        }
    },
    getLessonsAPI(){
        //这里要获取数据
        return function(dispatch,getState){
            //store.getState
            //请求时需要判断是否有更多
            let{currentLesson,lesson:{hasMore,offset,limit,isLoading}}=getState().home;
            //如果发送请求，还需要派发一个改loading的一个方法
            //如果正在加载也不要多次发请求了。
            if(!hasMore||isLoading)return;
            //发送请求之前 状态变成了正在加载
            dispatch({type:Types.CHANGE_LOADING_STATUS,status:true});
            //之后发送ajax请求
            dispatch({type:Types.SET_LESSONS,payload:getLessons(offset,limit,currentLesson)})
        }
    },
    refreshAPI(){
       return function(dispatch,getState){
            dispatch({type:Types.CLEAR_LESSONS});//派发清空数据
            actions.getLessonsAPI()(dispatch,getState);//获取最新的数据
       } 
    }

};

export default actions;