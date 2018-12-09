import React from 'react';
import * as actions from "../store/actions/auth";
import connect from "react-redux/es/connect/connect";
import { Link, withRouter } from 'react-router-dom';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
/*
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';



const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;
*/

/*class CustomLayout extends React.Component {

         state = {
        collapsed: false,
      };
         toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
        render(){
            return(
                <Layout>
            <Header className="header"
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >

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
                   <Menu.Item key="4">
                    <Link to='/train' onClick={this.toggle}>Тренировка</Link>
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
 */

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
    toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {
                      this.props.isAuthenticated ?
                    <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                   <Menu.Item key="4">
                    <Link to='/train' onClick={this.toggle}>Тренировка</Link>
                </Menu.Item>
            <Menu.Item key="5">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="7">Tom</Menu.Item>
              <Menu.Item key="8">Bill</Menu.Item>
              <Menu.Item key="9">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


const mapDispatchToProps = dispatch =>{
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SiderDemo));