import React from 'react';
import { Route} from 'react-router-dom';
import SimpleSlider from "./Simple";

const TranslateRouter = () => (
    <div>
        <Route exact path='/translates' component={SimpleSlider}/>
    </div>
);

export  default TranslateRouter;