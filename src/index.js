import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom';
import Home from "./containers/Home/Home";
import App from "./containers/App";
import Profile from "./containers/Profile/Profile";
import Lesson from "./containers/Lesson/Lesson";
import Detail from "./containers/Detail/Detail";
import Login from "./containers/Login/Login";
import Reg from "./containers/Reg/Reg";
import ProtectedRoute from "./ProtectedRoute";
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
ReactDOM.render(
<Provider store={store}>
    <Router>
        <App>
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <ProtectedRoute path="/lesson/" component={Lesson}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/login" component={Login}/>
                <Route path="/reg" component={Reg}/>
                <Route ptah="/detail/:lessonId" component={Detail}/>
                
            </Switch>
        </App>
    </Router>
</Provider>,window.root);