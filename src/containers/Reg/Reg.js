import React from 'react';
import './index.less';
import MHeader from '../../components/MHeader/MHeader';
import {connect} from 'react-redux';
import action from '../../store/actions/session';
class Reg extends React.Component{
    componentWillUnmount(){
        this.props.clearMessage();
    }
    render(){
        return <div className="reg">
        <MHeader>注册</MHeader>
        <div>
            <ul>
                <li>
                    <label htmlFor="username">用户名</label>
                    <input type="text" id="username" ref={x=>this.username=x}/>
                </li>
                <li>
                    <label htmlFor="password">密码</label>
                    <input type="text" id="password" ref={x=>this.password=x}/>
                </li>
                <li>
                    {/*如果有错误，显示错误信息；如果有成功信息，显示成功信息*/}
                    {this.props.err==1?<p style={{color:'red'}}>{this.props.msg}</p>:null}
                    {this.props.success.length?<p style={{color:'green'}}>{this.props.success}</p>:null}
                </li>
                
                <li>
                    <button onClick={()=>{
                        this.props.toRegAPI(this.username.value,this.password.value,this.props.history)
                    }}>注册</button>
                </li>

            </ul>
        </div>
    </div>
    }
}

export default connect(state=>({...state.session}),action)(Reg);