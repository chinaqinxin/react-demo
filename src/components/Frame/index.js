import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown,Avatar, Badge } from 'antd';
import {withRouter} from 'react-router-dom'
import Logo from './uugai.com_1599468914996.png'
import './frame.less'
import {connect} from 'react-redux'
import {getNotificationList} from '../../actions/notifications'
import { logoout } from "../../actions/user";
 
const { Header, Content, Sider } = Layout;



@withRouter
@connect(
  state => ({
    notificationsCount : state.notifications.list.filter(item => item.hashRead === false).length,
    avatar:state.user.avatar,
    displayName:state.user.displayName
  }),{
    getNotificationList,
    logoout
  }
)
class Frame extends Component {

    componentDidMount(){
      this.props.getNotificationList()
    }

    onMenuClick=({key})=>{
        this.props.history.push(key)
    }
    menuClick = ({ item, key, keyPath, domEvent }) =>{
      // console.log( item, key, keyPath, domEvent )
      if(key === '/login'){
        this.props.logoout()
      }else{
        this.props.history.push(key)
      }
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
        <Menu.Item key="/admin/profie">
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
            <Layout className="qx-layout">
            <Header className="qx-header" >
              <div className="qx-logo">
                    <img src={Logo} alt="qinxin" />
              </div>

              <div className="qx-header-div">
                <Dropdown overlay={this.renderDropdown()} trigger={['click']}>
                  <Badge count={notificationsCount} offset={[-150,15]}>
                    <div className="qx-header-div-Dropdown-Badge-div">
                      <Avatar src={this.props.avatar} /> 
                      <span style={{paddingRight:'10px'}}>欢迎你！{this.props.displayName}</span>  
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
                  onClick={this.onMenuClick}
                  className="Layout-Sider-Menu"
                >
                  {
                        this.props.menus.map((item)=>{
                            return <Menu.Item key={item.pathname} ><Icon type={item.icon}/>{item.title}</Menu.Item>
                        })
                  }
                </Menu>
              </Sider>
              <Layout className="layout">
                
                <Content
                  className="layou-Content"
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