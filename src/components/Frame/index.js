import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import {withRouter} from 'react-router-dom'
import Logo from './uugai.com_1584285667312.png'
import './frame.less'
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {
    onMenuClick=({key})=>{
        // console.log(item,key,keyPath,domEvent)
        this.props.history.push(key)
    }
    render() {
        return (
            <Layout style={{minHeight:"100%"}}>
            <Header className="qx-header">
              <div className="qx-logo">
                    <img src={Logo} alt="qinxin" />
              </div>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  selectedKeys={this.props.location.pathname}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={this.onMenuClick}
                >
                  {
                        this.props.menus.map((item)=>{
                            return <Menu.Item key={item.pathname} ><Icon type={item.icon}/>{item.title}</Menu.Item>
                        })
                  }
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px' }}>
                
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}

export default Frame