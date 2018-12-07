import { createStore} from 'redux'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

function cards(state = [], action) {
    if (action.type === 'ADD_CARD'){
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}
const store = createStore(cards);

ReactDOM.render(
    <Provider store={store}>
        <App>

        </App>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

