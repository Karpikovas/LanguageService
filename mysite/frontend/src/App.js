import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import BaseRouter from "./routes";
import TranslateRouter from './routes2'

class App extends Component {
  render() {
    return (

        <div>
            <CustomLayout>
                <Router>
                        <BaseRouter/>
                </Router>
            </CustomLayout>
        </div>
    );
  }
}
export default connect(
    state => ({}),
    dispatch => ({})
)(App);

/*
class App extends Component {
  state = {
    cards: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/cards/');
      const card = await res.json();
      this.setState({
        cards: card
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.cards.map(item => (
          <div key={item.id}>
            <h1>{item.word}</h1>
          </div>
        ))}
      </div>
    );
  }
}
export default App;
*/
