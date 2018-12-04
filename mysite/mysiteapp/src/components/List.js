import React, { Component } from 'react'

class List extends Component{
    state = {
        cards:[]
    };
    async loadCards(e) {
        e.preventDefault();
        const data = await fetch("/api/cards/").then(response =>response.json());


       this.setState({
            cards: data.word
       })
   }

   componentDidMount() {
       this.loadCards();
   }

   render(){
       return(
           <ul>
               {this.state.cards.map((card, index) => (
                   <li className="content-list__item" key={index}>
                       <h1>{card.word} </h1>
                   </li>
               ))}
           </ul>
       );
   }
}


export default List