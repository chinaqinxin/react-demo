import React, { Component,createRef } from 'react'
import {Card,Button, Form, Input, DatePicker,Spin, message} from 'antd'
import './editor.less'
import {getArticleById,saveArticle} from '../../requests'
import moment from 'moment'
import E from 'wangeditor'
// console.log(E)
const formItemLayout = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:12
    }
}
@Form.create()
class Edit extends Component {
    constructor(props){
        super(props)
        this.editorRef = createRef()
        // this.state={
        //     // titlevalidateStatus:"",
        //     // titlehelp:""
        // }
        this.state = {
            isLoading :false
        }
    }
    // antd 3.x form表单数据提交验证
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                // console.log('received values of form',values)
                // console.log(values.createAt.valueOf())

                const data = Object.assign({},values,{
                    createAt:values.createAt.valueOf()
                })

                this.setState({
                    isLoading:true
                })
                console.log(this.props.match.params.id,data,'qqq')
                saveArticle( this.props.match.params.id , data).then(resp => {
                    console.log(resp)
                    message.success('成功')
                    // 如果请求成功需要跳转
                     this.props.history.push('/admin/article')
                }).finally(()=>{
                    this.setState({
                        isLoading:false
                    })
                })
            }
        })
    }
    // 使用wangeditor创建一个editor
    initEditor = ( ) => {
        // ref上不是真是的dom元素，所以要
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange =  (html) => {
            // html变化后的html
            // console.log(html,'qqq')
            this.props.form.setFieldsValue({
                content:html
            })
        }
        this.editor.create()
    }
    // 挂载之前就去执行创建editor的函数
    componentDidMount(){
        this.initEditor()
        this.setState({
            isLoading:true
        })
        getArticleById(this.props.match.params.id).then((res)=>{
            // console.log(res)
            // res.creatrAt = moment(res.creatrAt)
            // this.props.form.setFieldsValue({
            //     title:res.title,
            //     admin:res.author,
            //     amount:res.amount,
            //     content:res.content,
            //     createAT:moment(res.creatrAt)
            // })
            
            const {id,...data} = res
            data.createAt = moment(res.createAt)
            this.props.form.setFieldsValue(data)
            this.editor.txt.html(data.content)
        }).finally(()=>{
            this.setState({
                isLoading:false
            })
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form
        // console.log(this.props)
        return (
            <Card
                title="编辑文章"
                bordered={false}
                extra={<Button onClick={this.props.history.goBack}>取消</Button>}
            >
                <Spin spinning={this.state.isLoading}>
                    <Form 
                        onSubmit={this.handleSubmit}
                        {...formItemLayout}
                    > 
                        <Form.Item
                            // validateStatus={this.state.titlevalidateStatus}
                            // help={this.state.titlehelp}
                            label="标题"
                        >
                            {
                                getFieldDecorator('title',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'请输入username'
                                        }
                                        // ,{
                                        //     min:4,
                                        //     message:'title必须大于4位'
                                        // },{
                                        //     max:8,
                                        //     message:'title必须小于8位'
                                        // },
                                        // {
                                        //     //自定义规则
                                        //     validator:(rule,value,callback)=>{
                                        //         // console.log({rule,value,callback})
                                        //         if(value!=="123"){
                                        //             console.log('qinxin')
                                        //             this.setState({
                                        //                 titlevalidateStatus:'error',
                                        //                 titlehelp:'qinxin'
                                        //             })
                                        //         }else{
                                        //             this.setState({
                                        //                 titlevalidateStatus:'',
                                        //                 titlehelp:''
                                        //             })
                                        //         }
                                        //         callback()
                                        //     }
                                        // }
                                    ]
                                })(
                                    <Input
                                        autoComplete={"off"}
                                        //  图标
                                        // prefix={<Icon type="user" style={{color:"rgba(0,0,0,.25)"}}/>}
                                        placeholder="UserName"
                                    />
                                )
                            }
                        </Form.Item>
                        
                        <Form.Item
                            label="author"
                        >
                            {
                                getFieldDecorator('author',{
                                    rules:[
                                        {
                                            required:true,
                                            message:"author是必须的"
                                        }
                                    ]
                                })(
                                    <Input
                                        placeholder="author"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="amount"
                        >
                            {
                                getFieldDecorator('amount',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'amount是必须'
                                        }
                                    ]
                                })(
                                    <Input placeholder="0"/>
                                )
                            }
                        </Form.Item>
                        
                        <Form.Item
                            label="发布时间"
                        >
                            {
                                getFieldDecorator('createAt',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'时间是必须的'
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        showTime
                                        placeholder="选择时间"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="内容"
                        >
                            {
                                getFieldDecorator('content',{
                                    rules:[
                                        {
                                            required:true,
                                            message:"内容是必须的"
                                        }
                                    ]
                                })(
                                    <div
                                        ref={this.editorRef}
                                        className="editor"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item wrapperCol={{offset:4}}>
                            <Button type="primary" htmlType="submit">
                                保存修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}

export default Edit