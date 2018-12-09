import React from "react";
import {Button, Carousel, Input} from 'antd';
import 'antd/dist/antd.less';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { List, Card, Icon, Progress
} from 'antd';
const { Meta } = Card;
class SimpleSlider extends React.Component {


    addChangeWord = (event, cardID) => {
      event.preventDefault();
      var word = event.target.elements.myword.value;
      //var cardID = event.target.elements.card.value;
      var rate = this.props.data[cardID-1].rate;

      console.log(rate);
      console.log(this.props.token);

      if (word === this.props.data[cardID-1].translate){
          var newrate = rate + 10;
          console.log(cardID);
            console.log(newrate);

                axios.defaults.headers={
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        }
        axios.put(`http://127.0.0.1:8000/api/cards/${cardID}/`,{
                word: this.props.data[cardID-1].word,
                translate: this.props.data[cardID-1].translate,
                rate: newrate,
                is_learned: newrate === 100,
                pos: this.props.data[cardID-1].pos
            })
            .then(res => console.log(res))
                .catch(error => console.error(error));

      }

    }

  render() {
    return (
      <Carousel>
          <List grid={{ gutter: 16, column: 4 }}
                dataSource={this.props.data}
                renderItem={item => (
                  <List.Item>
                      <Card title={item.word}>
                            <Meta description={item.rate}/>
                          <h4>{item.translate}</h4>
                      </Card>
                  </List.Item>
            )}
          >

        </List>
        {this.props.data.map(item => (
          <form name="card" key={item.id} onSubmit={(event)=>this.addChangeWord(
              event,
              item.id
          )}>
            <h1>{item.word}</h1>
              <Input  name="myword" placeholder="Введите слово" />
              <Button type="primary" htmlType="submit" >Ответить</Button>
          </form>
        ))}
      </Carousel>
    );
  }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
};
export default connect(mapStateToProps)(SimpleSlider);