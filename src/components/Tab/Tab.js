import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.less';
export default class Tab extends React.Component{
    render(){
        return <nav className="nav">
            <NavLink to={'/'} exact={true}><i className="iconfont icon-xingqiu"><span>首页</span></i></NavLink>
            <NavLink to={'/lesson'}><i className="iconfont icon-react"><span>我的课程</span></i></NavLink>
            <NavLink to={'/profile'}><i className="iconfont icon-xiaolian"><span>个人中心</span></i></NavLink>
        </nav>
    }
}