import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import BaseRouter from "./routes";
import * as actions from './store/actions/auth';
import CardListView from "./containers/CardsListView";
import SiderDemo from "./containers/Layout";


class App extends Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
    }
  render() {
    return (

        <div>
            <Router >
                <SiderDemo {...this.props}>
                    <BaseRouter location={this.props.location}/>
                </SiderDemo>
            </Router>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

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
