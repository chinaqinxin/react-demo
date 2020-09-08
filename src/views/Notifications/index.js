import React, { Component } from 'react'
import {Button, Card, List,Avatar, Badge, Spin} from 'antd'
import {connect} from 'react-redux'
import {markNotificationsReadById,markAllNotificationsAsRead} from '../../actions/notifications'
// 此处data是练习写的数据，使用请求后便可以注释
// const data = [
//     {
//       title: 'Ant Design Title 1',
//     },
//     {
//       title: 'Ant Design Title 2',
//     },
//     {
//       title: 'Ant Design Title 3',
//     },
//     {
//       title: 'Ant Design Title 4',
//     },
//   ];


//   connect导入reducers里的数据的两种写法，一种是将state的数据map出来定义才一个常量中，然后用connect的第一个参数传递进去，高阶函数的写法，使其包裹的组件拥有其传递的数据，生成一个新的组件（有数据的组件）
// const mapState = state => {
//     const {list = []} = state.notifications
//     return {list }
// }
// @connect(mapState)

//装饰器模式（不需要在组件外边再去包裹一层，用最原始的高阶函数写法去写了）
@connect(
    state => ({
        list:state.notifications.list,
        isLoading:state.notifications.isLoading
    }),{
        markNotificationsReadById,
        markAllNotificationsAsRead
    }
)
class Notifications extends Component {
    render() {
        const {list,isLoading } = this.props
        return (
            <Spin spinning={isLoading}>
                <Card
                    title="通知中心"
                    bordered={false}
                    extra={
                        <Button 
                            disabled = {list.every(item => item.hashRead === true)}
                            onClick={this.props.markAllNotificationsAsRead}
                        >
                            全部标记为已读
                        </Button>
                    }
                >
                    <List 
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                extra={item.hashRead ? null : <Button onClick={this.props.markNotificationsReadById.bind(this,item.id)}>标记为已读</Button>}
                            >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={!item.hashRead} >
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Badge>
                                }
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }
}

export default Notifications