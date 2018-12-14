import React from 'react';
import logo from '../../common/images/logo.png';
//引入transition 组件
import Transition from 'react-transition-group/Transition';
//默认样式
const duration=300;//动画时间
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    display:'none'
  }
  const transitionStyles = {//到时候状态是entering或entered
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
  };
  
export default class HomeHeader extends React.Component{
    constructor(){
        super();
        this.state={isShow:false};
    }
    changeShow=()=>{//改变显示还是隐藏的状态
        this.setState({isShow:!this.state.isShow})
    }
    render(){
        return <div className="home-header">
                <div className="header-logo">
                    <img src={logo}/>
                    <div onClick={this.changeShow}>
                        {this.state.isShow? <i className="iconfont icon-guanbi"></i>:
                        <i className="iconfont icon-liebiao"></i>}
                        
                    </div>
                </div>
                <Transition in={this.state.isShow} timeout={duration} onEnter={(node)=>{
                    node.style.display='block';
                }} onExited={(node)=>{
                    node.style.display='none';
                }}>
                    {
                        (state)=>(
                            <ul className="header-menu"style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                                onClick={(e)=>{
                                    this.props.selectCurrentLesson(e.target.dataset.type);
                                    this.changeShow();//点完后隐藏列表
                                }}
                            >
                                <li data-type="all">全部课程</li>
                                <li data-type="react">React课程</li>
                                <li data-type="vue">Vue课程</li>
                            </ul>
                        )
                    }
                </Transition>
               
          
        </div>
    }
}