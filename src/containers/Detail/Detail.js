import React from 'react';
import './index.less';
import MHeader from '../../components/MHeader/MHeader';
import {getLesson} from '../../api/home';
import 'babel-polyfill';
export default class Detail extends React.Component{
    constructor(){
        super();
        this.state={lesson:{}};
    }
    async componentWillMount(){
         //如果state中有值，说明用户是从页面点击过来的
        let lesson=this.props.location.state;
        if(lesson){
            this.setState({lesson});
        }else{
            //用户自己写，不是通过点击过来，此时需要取出id进行服务端查询（这个数据不用存redux，因为不需要共享）
            lesson=await getLesson(this.props.match.params.lessonId);
            this.setState({lesson}); 
        }
    }
   
    render(){
        return  <div>
                    <MHeader>详情页</MHeader>
                    <video src={this.state.lesson.video} style={{width:'100%'}} poster={this.state.lesson.poster} controls={true}></video>
                </div>
    }
}