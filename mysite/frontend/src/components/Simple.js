import React from "react";
import {Button, Carousel, Input} from 'antd';
import 'antd/dist/antd.less';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import { Alert, List, Card, Icon, Progress,Row, Col, Rate
} from 'antd';
import {withRouter} from "react-router-dom";


class SimpleSlider extends React.Component {

    state ={
        card: [],
        answer: [],
        translate: [],
        cnt: 0
    }

    setinitialState = () =>{
        this.setState({
            answer: false,
        })
    }

    getResult = (card, answer, translate, cnt) => {
            this.setState({
                cnt: this.state.cnt + cnt,
                answer: [...this.state.answer, answer],
                card: [...this.state.card, card],
                translate: [...this.state.translate, translate]
            });
    }


    addChangeWord = (event, cardID, rate, translate, card) => {
      event.preventDefault();
      var word = event.target.elements.myword.value;
      //var cardID = event.target.elements.card.value;
     // var rate = Number(this.props.data[cardID-1].rate);


      console.log(this.props.data);
      console.log(this.props.token);

      if (word === translate){
          this.getResult(card, true, translate, 1);
         var newrate = rate + 10;
          console.log(cardID);
           // console.log(newrate);

                axios.defaults.headers={
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        }
        axios.patch(`http://127.0.0.1:8000/api/cards/${cardID}/`,{
                id: cardID,
                rate: newrate,
                //rate: newrate,
                is_learned: newrate === 100,
                //pos: this.props.data[cardID].pos
            })
            .then(res => console.log(res))
                .catch(error => console.error(error));

      } else {
          this.getResult(card, false, translate, 0);
      }

    }
    constructor(props) {
            super(props);
            this.next= this.next.bind(this);
          }
          next() {
            this.carousel.next();
          }


  render() {

    return (

      <Carousel ref={carousel => (this.carousel = carousel)}  >
          <div align="center">
              <br/>
              <h2 align="center">Изучите карточки перед началом тренировки</h2>
              <List grid={{ gutter: 16, column: 2 }}
                dataSource={this.props.data}
                renderItem={item => (

                    <List.Item>
                      <br/>
                      <Card title={item.word}>
                          <h4>{item.translate}</h4>
                      </Card>
                  </List.Item>
                    )}
                  >
            </List>
              <br/>
              <Button type="primary" size='large' onClick={this.next} >Приступить к тренировке</Button>
              <br/>
              <br/>
          </div>

        {this.props.data.map(item => (
          <form name="card" key={item.id} align="center" onSubmit={(event)=>this.addChangeWord(
              event,
              item.id,
              item.rate,
              item.translate,
              item.word
          )}>
            <h1>{item.word}</h1>
              <br/>
              <Input name="myword" placeholder="Введите слово" />
                            <br/>
                            <br/>
              <Button type="primary" size='large' htmlType="submit" onClick={this.next} >Ответить</Button>
              <br/>
              <br/>
              <Button type="default" align='right'size='large' onClick={(event)=>{this.next();this.getResult(item.word, false, item.translate, 0);}} >Пропустить</Button>
          </form>
        ))}
          <div align="center">
              <h1>Результат</h1>
               <Rate disabled value={this.state.cnt} count={this.props.data.length} />
              <h2>Правильных ответов {Number(this.state.cnt)} из {this.props.data.length}</h2>

              <div align="center">
                      <Row gutter={8} >
                          {this.state.card.map(item => (
                          <Col span={4} key={item}>
                              <h3>{item}</h3>
                          </Col>))}
                      </Row>
                    <Row gutter={8}>
                          {this.state.translate.map(item => (
                          <Col span={4} key={item}>
                              <Alert message={item} type="info"> </Alert>
                          </Col>))}
                      </Row>
                      <Row gutter={4}>
                          {this.state.answer.map(item => (
                          <Col span={4} key={item}>
                            {item ? <Alert message="Success Tips" type="success" showIcon /> :
                            <Alert message="Error" type="error" showIcon />}
                          </Col>))}
                      </Row>

              </div>
          </div>
      </Carousel>
    );
  }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
};
export default withRouter(connect(mapStateToProps)((SimpleSlider)));