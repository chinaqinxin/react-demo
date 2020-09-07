import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown,Avatar, Badge } from 'antd';
import {withRouter} from 'react-router-dom'
import Logo from './uugai.com_1599468914996.png'
import './frame.less'
import {connect} from 'react-redux'

const { Header, Content, Sider } = Layout;



@withRouter
@connect(
  state => ({
    notificationsCount : state.notifications.list.filter(item => item.hashRead === false).length
  })
)
class Frame extends Component {

    onMenuClick=({key})=>{
        console.log(key)
        this.props.history.push(key)
    }
    menuClick = ({ item, key, keyPath, domEvent }) =>{
      // console.log( item, key, keyPath, domEvent )
      this.props.history.push(key)
    }
    renderDropdown = () => (
      <Menu
        onClick={this.menuClick}
      >
        <Menu.Item key="/admin/notifications">
          <Badge dot={Boolean(this.props.notificationsCount)}>
              通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
            个人设置
        </Menu.Item>
        <Menu.Item key="/login">
            退出登陆
        </Menu.Item>
      </Menu>
    );
    render() {
      const {notificationsCount} =  this.props
        return (
            <Layout style={{minHeight:"100%"}}>
            <Header className="qx-header">
              <div className="qx-logo">
                    <img src={Logo} alt="qinxin" />
              </div>

              <div>
                <Dropdown overlay={this.renderDropdown()} trigger={['click']}>
                  <Badge count={notificationsCount} offset={[-150,10]}>
                    <div style={{display:"flex",alignItems:'center'}}>
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> 
                      <span>欢迎你！秦鑫</span>  
                      <Icon type="down"/>
                    </div>
                  </Badge>
                  
                </Dropdown>
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