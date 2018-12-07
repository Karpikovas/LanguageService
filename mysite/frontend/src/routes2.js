import React from 'react';
import { Route} from 'react-router-dom';
import SimpleSlider from "./components/Simple";

const TranslateRouter = () => (
    <div>
        <Route exact path='/translates' component={SimpleSlider}/>
    </div>
);

export  default TranslateRouter;