import React from 'react';
import {
  Drawer, Form, Button, Col, Row, Input, Radio
} from 'antd';
import axios from "axios";

const RadioGroup = Radio.Group;
class DrawerForm extends React.Component {
  state = {
      visible: false,
      checkedTr: "",
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

  addChangeWord = (event, requestType, cardID) => {
      event.preventDefault();
      const word = event.target.elements.myword.value;
      console.log(word);

      switch( requestType ){
          case 'post':
            return axios.post('http://127.0.0.1:8000/api/cards/',{
                word: "word",
                translate: "word"
            })
            .then(res => console.log(res))
                .catch(error => console.error(error));
          case 'put':
            return axios.put(`http://127.0.0.1:8000/api/cards/${cardID}/`,{
                word: word,
                translate: this.translate
            })
            .then(res => console.log(res))
                .catch(error => console.error(error));
      }

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
      <div>
        <Button type="primary" onClick={this.showDrawer}>
            Добавить новое слово
        </Button>
        <Drawer
          title="Добавить слово"
          width={720}
          placement="right"
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
              this.props.cardID)}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <Input  name="myword" placeholder="Введите слово" />
                </Form.Item>
              </Col>
                <Col span={12}>
                <Form.Item>
                    <Button type="primary" onClick={this.findWord} >Найти</Button>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Варианты перевода">
                  {getFieldDecorator('Варианты перевода', {
                    rules: [{ required: true, message: 'Выбран перевод' }],
                  })(
                      <div>
                          <RadioGroup defaultValue={1} >
                              <Radio >Вариант 1</Radio>
                              <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                             </RadioGroup>


                      </div>

                  )}
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
            <Button onClick={this.onClose} type="primary" htmlType="submit">Добавить</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const WordForm = Form.create()(DrawerForm);

export default WordForm;