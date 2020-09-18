import { Card, Upload, Icon, Spin } from 'antd'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {changeAvatar} from '../../actions/user'
@connect(
    state=>({
        avatarUrl:state.user.avatar
    }),{
        changeAvatar
    }
)
class Profie extends Component {
    state={
        isUploading:false
    }

    handleUploadAvatr = ({file}) =>{
        // console.log(file)
        const data = new FormData()
        // console.log(data,'new formdata')
        data.append('Token',
                    'a7db7ad768f4bbe86ef312ece72bc97dac0ca40b:fOIuI0xrUw4BUU-TkAdBQ5p-IOg=:eyJkZWFkbGluZSI6MTYwMDQxNDQ0NiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzI2OTg1IiwiYWlkIjoiMTcxODIyMCIsImZyb20iOiJmaWxlIn0='
        )
        data.append('file',file)
        this.setState({
            isUploading:true
        })
        axios.post('http://up.imgapi.com/',data).then(resp=>{
            // console.log(resp)
            if(resp.status === 200){
                this.setState({
                    isUploading:false
                })
                this.props.changeAvatar(resp.data.linkurl)
            }else{
                console.log('失败')
            }

        }).catch(error=>{
            console.log('失败')
        })
    }

    render() {
        // console.log(this.props.avatarUrl)
        return (
            <Card
                title="个人设置"
                bordered={false}
            >
                <Upload
                    customRequest={this.handleUploadAvatr}
                    showUploadList={false}
                >
                    <Spin
                        spinning={this.state.isUploading}
                    >
                            <div
                                style={{display:'block'}}
                            >
                                <span style={{border:'1px solid #ededed',fontSize:'16px'}}><Icon type="upload" style={{fontSize:'16px'}}/>点击上传头像</span>
                                {
                                    this.props.avatarUrl ?
                                    <img 
                                        style={{width:'80px',height:'80px',display:'block',margin:'10px'}}
                                        src={this.props.avatarUrl} alt="头像"
                                    />
                                    :
                                    <div
                                        style={{margin:'10px',color:'gray',opacity:'.4'}}
                                    >
                                        头像显示区域
                                    </div>
                                }
                            </div>
                            

                    </Spin>
                </Upload>
            </Card>
        )
    }
}

export default Profie