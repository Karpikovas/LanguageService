import React from 'react';
import Cards from '../components/Cards';
import axios from 'axios';
import WordForm from '../components/Form';
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
            <div>
                <WordForm requestType='post' cardID={null}/>
                <br/>
                <Cards data={this.state.cards}/>
            </div>

        );
    }
}
export default CardsListView;