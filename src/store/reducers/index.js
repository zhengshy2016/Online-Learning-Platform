import {combineReducers} from 'redux';
import home from './home';
import session from './session';
//{home:{currentLesson:'all'},session:{user,err,msg,success}}
export default combineReducers({home,session});
