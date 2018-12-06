import React from 'react';
import Cards from './Cards';
import axios from 'axios';

class CardsListView extends React.Component{
    state = {
        cards: []
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/cards/')
            .then(res => {
                this.setState({
                    cards: res.data
                });
            })

    }
    render(){
        return (
            <Cards data={this.state.cards}/>
        );
    }
}
export default CardsListView;