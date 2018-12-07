import React from 'react';
import { Route} from 'react-router-dom';
import CardListView from './CardsListView';
import WordForm from './Form';
const BaseRouter = () => (
    <div>
        <Route exact path='/' component={CardListView}/>
    </div>
);

export  default BaseRouter;