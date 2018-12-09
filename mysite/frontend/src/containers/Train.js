import React from "react";
import {Button, Carousel, Input} from 'antd';
import 'antd/dist/antd.less';
import connect from "react-redux/es/connect/connect";
import axios from "axios";

import SimpleSlider from '../components/Simple';

class Train extends React.Component {
    state = {
        cards: []
    }

    componentWillReceiveProps(newProps){
        if (newProps.token){
                    axios.defaults.headers={
            "Content-Type": "application/json",
            "Authorization": `Token ${newProps.token}`
        }
        axios.get('http://127.0.0.1:8000/api/cards/')
            .then(res => {
                this.setState({
                    cards: res.data
                });
            })
        }
    }
  render() {
    return (
      <SimpleSlider data={this.state.cards} />
    );
  }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
};
export default connect(mapStateToProps)(Train);