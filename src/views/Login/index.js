import React, { Component } from 'react'
import { Input, Button, Checkbox, Form, Icon, Card } from 'antd'
import {connect} from 'react-redux'
import {login} from '../../actions/user'
import {Redirect} from 'react-router-dom'
import './login.less'

// const wrapperCol={
//     xs:{
//         span:20,
//         offset:2
//     },
//     md:{
//         span:8,
//         offset:8
//     }
// }

@Form.create()
@connect(
    state=>({
        isLogin:state.user.isLogin,
        isLoading:state.user.isLoading
    }),{
        login
    }
)
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.login(values)
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.isLogin
            ?
            <Redirect to="/admin"/>
            :
            <Card
                title="后台admin登陆"
                className="qx-admin-warpper"
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名是必须的!' }],
                        })(
                            <Input
                                disabled={this.props.isLoading}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"
                                autoComplete={'off'}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                disabled={this.props.isLoading}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                                autoComplete={'off'}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox disabled={this.props.isLoading}>记住用户名密码</Checkbox>)}
                        {/* <a className="login-form-forgot" href="">
                            忘记密码
                        </a> */}
                        <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button" style={{margin:'0 10px'}}>
                            登陆
                        </Button>
                        {/* <a href="">注册新用户</a> */}
                    </Form.Item>
                </Form>
            </Card>
            )
    }
}
export default Login