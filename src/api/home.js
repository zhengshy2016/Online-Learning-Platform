//获取轮播图
import axios from './index';
axios.defaults.withCredentials=true;//允许携带凭证
export function getSliders(){
    //每个接口返回的都是promise
    return axios.get('/silders');
}
//获取所有课程 offset limit type
export function getLessons(offset,limit,type){
    return axios.get(`/lessons/${offset}/${limit}/${type}`);
}

//获取某一门课程 需要参数id
export function getLesson(id){
    return axios.get(`/lesson/${id}`);
}