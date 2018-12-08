import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import * as actions from "../store/actions/auth";
import connect from "react-redux/es/connect/connect";

const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;

class CustomLayout extends React.Component{
    render(){
        return(
            <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
              {
                  this.props.isAuthenticated ?

                  <Menu.Item key="1" onClick={this.props.logout}>
                    Выйти
                    </Menu.Item>
                      :

                      <Menu.Item key="2">
                        <Link to='/login/'>Войти</Link>
                    </Menu.Item>
              }
            <Menu.Item key="3">
                <Link to='/'>Мои карточки</Link>
            </Menu.Item>


          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>);
    }

}

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));