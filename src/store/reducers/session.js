import * as Types from '../action-types';
import { bindActionCreators } from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
let initState={
    user:null,
    msg:'',
    success:'',
    err:0
};

function session(state=initState,action){
    switch(action.type){
        case Types.SET_USER_INFO:
            return {...action.user};//用获取的数据放到redux中
        case Types.CLEAR_MESSAGE:
            return {...state,...action.info}   
    }
    return state;
}

export default session;