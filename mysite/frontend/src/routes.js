import React from 'react';
import { Route, Switch} from 'react-router-dom';
import CardListView from './containers/CardsListView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Train from './containers/Train'

const BaseRouter = (props) => (
    <div>
        <Switch >
            <Route location={props.location} exact path='/' component={CardListView}/>
            <Route location={props.location} exact path='/login/' component={Login}/>
            <Route location={props.location} exact path='/signup/' component={Signup}/>
            <Route location={props.location} exact path='/train/' component={Train}/>
        </Switch>
    </div>
);

export  default BaseRouter;