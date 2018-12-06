import React from 'react';
import { Route} from 'react-router-dom';
import BaseRouter from './routes';
import TranslateRouter from './routes2';
const MainRouter = () => (
    <div>
        <Route exact path='/' component={BaseRouter}/>
        <Route exact path='/' component={TranslateRouter}/>
    </div>
);

export default MainRouter;