import React from 'react';
import {toValidate} from './api/session';
import {withRouter} from 'react-router-dom';
 class ProtectedRoute extends React.Component{
    async componentDidMount(){
        let {user}=await toValidate();
        if(!user){
            this.props.history.push('/login');
        }

    }
    render(){
        let C=this.props.component;
        return <C/>;
    }
}
export default withRouter(ProtectedRoute);
