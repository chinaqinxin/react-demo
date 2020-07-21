import React, { Component } from 'react'
import {Form,Input,Button} from 'antd'

export default class Settings extends Component {
    render() {
        return (
            <div>
                Settings
                <Form.Item>
                    <Input style={{width:'200px'}}/>
                    <Button>
                        确定提交
                    </Button>
                </Form.Item>
                
            </div>
        )
    }
}
