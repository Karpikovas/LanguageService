import React from 'react';
import { Route} from 'react-router-dom';
import CardListView from './CardsListView';
import SimpleSlider from "./Simple";
import CustomLayout from './Layout'
const BaseRouter = () => (
    <div>
        <CustomLayout>
                <Route exact path='/' component={CardListView}/>
        </CustomLayout>

    </div>
);

export  default BaseRouter;