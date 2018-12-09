import React from 'react';
import Cards from '../components/Cards';
import axios from 'axios';
import WordForm from '../components/Form';
import * as actions from "../store/actions/auth";
import connect from "react-redux/es/connect/connect";
class CardsListView extends React.Component{
    state = {
        cards: []
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
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
                console.log(res.data);
            })

        }

    }
    render(){
        return (
            <div>
                <WordForm requestType='post' cardID={null}/>
                <br/>
                <Cards data={this.state.cards}/>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
};
export default connect(mapStateToProps)(CardsListView);