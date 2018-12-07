import React from 'react';
import { List, Card, Icon, Progress
} from 'antd';

const { Meta } = Card;

const Cards = (props) => {
    return(
        <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={props.data}
    renderItem={item => (
      <List.Item>
          <Card title={item.word} actions={[<Icon type="delete" />, <Icon type="edit">

          </Icon>]} extra={<Progress type="circle" percent={Number(item.rate)} width={50} />}>
                <Meta description={item.pos}/>
              <h4>{item.translate}</h4>
          </Card>
      </List.Item>
    )}
  />
    );
}

export default Cards;