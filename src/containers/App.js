import React from 'react';
import Tab from '../components/Tab/Tab';
import '../common/reset.less';
export default class App extends React.Component{
    render(){
        return <div>
            {this.props.children}
            <Tab/>
        </div>
    }
}