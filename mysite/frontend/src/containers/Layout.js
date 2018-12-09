import React from 'react';
import * as actions from "../store/actions/auth";
import connect from "react-redux/es/connect/connect";
import { NavLink, Switch, Link, withRouter } from 'react-router-dom';
import {
  Layout, Menu, Breadcrumb, Icon,Button
} from 'antd';

const {
  Header, Content, Footer, Sider,Carousel
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
      collapsed: true
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>

              {
                      this.props.isAuthenticated ?
                          <Layout>
                          <Sider
                              collapsible
                              collapsed={this.state.collapsed}
                              onCollapse={this.onCollapse}
                            >
                              <div className="logo" />
                              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                              <Menu.Item key="1" onClick={(event)=>{this.props.logout()}}>
                                <Icon type="logout" />
                                  <span>Выйти</span>
                                </Menu.Item>

                                  <Menu.Item key="3">
                                        <NavLink activeClassName="active" to={{
                                          pathname: '/',
                                            state: {
                                            fromNotifications: true
                                          }
                                        }
                                        }> <Icon type="table" />
                                  <span>Мои карточки</span></NavLink>
                                    </Menu.Item>
                                       <Menu.Item key="4">
                                        <NavLink  to='/train/' onClick={this.toggle}>
                                            <Icon type="down-circle" /> <span>Тренировка</span></NavLink>
                                    </Menu.Item>

                              </Menu>
                            </Sider>
                              <Layout>
                              <Content>
                                {this.props.children}
                                <Footer style={{ textAlign: 'center' }}>
                                Ant Design ©2018 Created by Ant UED
                              </Footer>
                              </Content>

                            </Layout>

                          </Layout>
                          :
                    <Layout >
                            <Content style={{background: '#87CEFA', margin: '24px 16px 0', overflow: 'initial' }}>

                     <div style={{ padding: 24, textAlign: 'center', overflow: 'initial' }}>

                            <Link to='/login/' onClick={this.toggle}><Button type='primary' size='large'>
                              <Icon type="plus" />
                                <span>Присоединиться</span>
                             </Button></Link>
                         <br/>
                         <br/>
                             { this.state.collapsed ?
                                 this.props.children
                             :
                             null}
                     </div>
                        </Content>

                    </Layout>
                  }


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