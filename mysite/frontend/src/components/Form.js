import React from 'react';
import {
  Drawer, Form, Button, Col, Row, Input, Radio, Icon
} from 'antd';
import axios from "axios";
import connect from "react-redux/es/connect/connect";

const RadioGroup = Radio.Group;
class DrawerForm extends React.Component {
  state = {
      visible: false,
      checkedTr: '',
      yandexAPI: []
  };

  findWord = (event) => {
      event.preventDefault();
      const key = "dict.1.1.20181118T141413Z.bfcea663a4053215.b4c2bb5d5ce05190b93ce88c5f596dfb556fcbc7";
      const text = "time";
        axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${text}`)
            .then(res => {
                this.setState({
                    yandexAPI: res.data
                });
                console.log(this.state.yandexAPI);
            })
  }

  addChangeWord = (event, requestType, newProps , cardID) => {
      event.preventDefault();
      var word = event.target.elements.myword.value;
      console.log(word);
      axios.defaults.headers={
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        }
        console.log(this.props.token);
      switch( requestType ){
          case 'post':
            return axios.post('http://127.0.0.1:8000/api/cards/',{
                word: `${word}`
            })
            .then(res => console.log(res))
                .catch(error => console.error(error));
          case 'delete':
            return axios.delete(`http://127.0.0.1:8000/api/cards/${cardID}/`)
            .then(res => console.log(res))
                .catch(error => console.error(error));
      }
      this.forceUpdate();

  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div align="center">
          <br/>
        <Button size= 'large' type="primary" align="center" onClick={this.showDrawer}>
            <Icon type="plus-circle" size='large' width={20} height={20}> </Icon>
                <span>Добавить новое слово</span>
        </Button>
        <Drawer
          title="Добавить слово"
          width={720}
          placement="bottom"
          onClose={this.onClose}

          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={(event)=>this.addChangeWord(
              event,
              this.props.requestType,
              this.props.newProps,
              this.props.cardID)}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <Input  name="myword" placeholder="Введите слово" />
                </Form.Item>
              </Col>
                <Col span={12}>
                <Form.Item>

                    <Button type="primary" htmlType="submit"      onClick={this.onClose} >Добавить</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Отмена
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const WordForm = Form.create()(DrawerForm);
const mapStateToProps = state => {
    return {
        token: state.token
    }
};
export default connect(mapStateToProps)(WordForm);