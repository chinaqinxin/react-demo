import { Card, Upload, Icon } from 'antd'
import React, { Component } from 'react'
import { UploadOutlined } from '@ant-design/icons';

export default class Profie extends Component {
    stste={
        isUploading:false,
        avatarUrl:''
    }
    render() {
        return (
            <Card
                title="个人设置"
                bordered={false}
            >
                <Upload>
                    <Icon type="upload" />
                </Upload>
            </Card>
        )
    }
}
