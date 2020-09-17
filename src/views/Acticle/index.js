import React, { Component } from "react";
import { Card, Button, Table,Tag,Popconfirm, message, Tooltip} from "antd";
import {getArticles,deleteArticle} from '../../requests/index'
import moment from 'moment'
import XLSX from 'xlsx'
// const dataSource = [
//     {
//         key: "1",
//         name: "胡彦斌",
//         age: 32,
//         address: "西湖区湖底公园1号"
//     },
//     {
//         key: "2",
//         name: "胡彦祖",
//         age: 42,
//         address: "西湖区湖底公园1号"
//     }
// ];

// const columns = [
//     {
//         title: "姓名",
//         dataIndex: "name",
//         key: "name"
//     },
//     {
//         title: "年龄",
//         dataIndex: "age",
//         key: "age"
//     },
//     {
//         title: "住址",
//         dataIndex: "address",
//         key: "address"
//     },
//     {
//         title:"操作",
//         dataIndex:"actions",
//         key:"actions",
//         render:(text,record,index)=>{
//             // console.log(text,record,index,'xxxxxx')
//             return <div>
//                 q111
//             </div>
//         }
//     }
// ];
const ButtonGroup = Button.Group
const titleDisplayMap = {
    id:"id",
    title:"标题",
    author:"作者",
    createAt:"创建时间",
    amount:"阅读量",
}
export default class Acticlelist extends Component {
    constructor(props){
        super(props)
        this.state={
            dataSource : [],
            columns : [],
            total:0,
            isLoading:false,
            offset:0,
            limited:10
        }
    }
    // 挂在之前
    componentDidMount(){
        this.getData()
    }

     // 自定义setstate
    //  getData = (state) =>{
    //     if(!this.updater.isMounted(this)) return
    //     this.setState(state)
    // }

    // 初始化是要加载的数据   提取出来的function
    getData = () => {
        this.setState({
            isLoading:true
        })
        getArticles(this.state.offset,this.state.limited).then(resp=>{
              const columnsKeys = Object.keys(resp.list[0])
              const columns = this.createColumns(columnsKeys)
            //   如果请求完成以后组件已经销毁就不要在setstate
              if(!this.updater.isMounted(this)) return
              this.setState({
                  total:resp.total,
                  dataSource:resp.list,
                  columns
              })
            }).catch(err=>{
                // 处理错误
                console.log(err)
            }).finally(()=>{
                if(!this.updater.isMounted(this)) return
                this.setState({
                    isLoading:false
                })
            })
    }
    // 页面变化的function
    onPageChange = ( page,pageSize) =>{
        this.setState({
            offset:pageSize * (page - 1),
            limited:pageSize
        },()=>{
            this.getData()
        })
    }
    // 显示条数发生变化
    onShowSizeChange = ( current,size ) => {
        console.log(current,size,'xxxx')
        this.setState({
            offset:0,
            limited:size
        },()=>{
            this.getData()
        })
    }
    // 点击删除
    PopconfirmdeleteArticle = (record) =>{
        deleteArticle(record.id).then((res)=>{
            message.success(res.msg)
            this.setState({
                offset:0
            },()=>{
                this.getData()
            })
        })
    }
    // 点击编辑
    toEditor = (record) =>{
        // this.props.history.push(`/admin/article/edit/${record.id}`)
        // console.log(record)
        this.props.history.push({
                pathname:`/admin/article/edit/${record.id}` ,
                state:{
                    title:record.title
                }
            })
    }

    // 常见columns
    createColumns = (columnsKeys) =>{
        // return columnsKeys.map(item=>{
        //         return {
        //             title:titleDisplayMap[item],
        //             dataIndex:item,
        //             key:item
        //         }
        //       })
        // 根据后端返回的数据进行页面渲染
        // return columnsKeys.map(item=>{
        // 添加一行操作
        const columns = columnsKeys.map(item=>{
            if(item === 'amount'){
                return {
                    title:titleDisplayMap[item],
                    key:item,
                    render:(text,record)=>{
                        const {amount} = record

                        // const titleMap = {
                        //     '001':'red',
                        //     '002':'#09f',
                        //     '003':'green'
                        // }
                        // return  <Tag color={titleMap[item]}>{record.title}</Tag>

                        return  (
                            <Tooltip title={amount > 220 ? '超过230' : '未超过230'}>
                                <Tag color={amount > 220 ? 'red' : 'blue'}>{record.amount}</Tag>
                            </Tooltip>
                        )
                    }
                }
            }
            if(item === 'createAt'){
                return {
                    title:titleDisplayMap[item],
                    key:item,
                    render:(text,record)=>{
                        const {createAt} = record
                        return  moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
                    }
                }
            }
            return {
                            title:titleDisplayMap[item],
                            dataIndex:item,
                            key:item
                        }
            })
            columns.push({
                title:'操作',
                key:'action',
                render:(text,record,index)=>{
                    return (
                        <ButtonGroup>
                            <Button size="small" type="primary" onClick={()=>{this.toEditor(record)}}>编辑</Button>

                            <Popconfirm 
                                title="确定要删除吗?" 
                                onConfirm={()=>{this.PopconfirmdeleteArticle(record)}}
                                okButtonProps={{ type: 'default' }}
                            >
                            {/* onClick={this.deleteArticle.bind(this,record.id)} */}
                                <Button size="small" type="danger" >
                                    删除
                                </Button>
                            </Popconfirm>
                            
                        </ButtonGroup>
                    )
                        
                }
            })
            return columns
        
    }
    // 导出excel
    toExcel = () =>{
        // 因为object.keys  或 values 这种取到的值都是无序的，所以最好的方法还是定义一个完整的而为数组
        // const data = [Object.keys(this.state.dataSource[0])]
        const data = [['id','title','author','amount','createAt']]
        for(let i=0;i< this.state.dataSource.length;i++){
            // 要是没有特殊数据的话就这样处理了
            // data.push(Object.values(this.state.dataSource[i]))
            
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('YYYY-MM-DD HH:mm:ss')
            ])
        }
        // 创建一个workbook
        // const ws = XLSX.utils.aoa_to_sheet([["a","b"],[1,2]]);
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        //  创建一个这样的文件发送给客户端
		XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format('YYYY-MM-DD')}.xlsx`)
    }

    
    render() {
        return (
            <Card
                title="文章列表"
                bordered={false}
                extra={<Button onClick={this.toExcel}>导出excel</Button>}
            >
                <Table 
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns} 
                    loading={this.state.isLoading}
                    pagination={{
                            current:this.state.offset / this.state.limited + 1,
                            total:this.state.total,
                            hideOnSinglePage:true,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            pageSizeOptions:['10','20','30','40','50','100'],
                            onShowSizeChange:this.onShowSizeChange,
                            onChange : this.onPageChange
                    }}
                />
            </Card>
        );
    }
}
