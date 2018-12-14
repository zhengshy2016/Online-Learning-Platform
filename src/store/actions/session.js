import * as Types from '../action-types';
import {toReg,toLogin,toValidate} from '../../api/session';
let actions={
    toRegAPI(username,password,history){
        
        //如果注册成功了，跳转页面 跳转到登录页
        return function(dispatch,getState){
           toReg(username,password).then(function(data){
               //data为我们的服务端返回的结果
               if(data.err===1){
                   //失败了,手动的派发返回的数据
                   dispatch({type:Types.SET_USER_INFO,user:data});
               }else{
                   //跳转路径
                   setTimeout(()=>{
                    
                    history.push('/login');//成功注册
                    
                   },1000);
                   
                   dispatch({type:Types.SET_USER_INFO,user:data});

               }
           });
        }
    },
    clearMessage(){
        return {type:Types.CLEAR_MESSAGE,info:{msg:'',success:'',err:0}}
    },
    toLoginAPI(username,password,history){
        return function(dispatch,getState){
            toLogin(username,password).then(function(data){
                dispatch({type:Types.SET_USER_INFO,user:data});
                if(data.err===0){
                    setTimeout(()=>{
                        //成功跳转到个人中心页面
                        history.push('/profile');
                    },1000);
                }
            })
        }
    },
    toValidateAPI(){
        return function(dispatch,getState){
            toValidate().then(function(data){
                dispatch({type:Types.SET_USER_INFO,user:data});
            })
            
        }
    }

};
export default actions;