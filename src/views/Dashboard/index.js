import React, { Component,createRef } from 'react'
import {Card, Row,Col} from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import {saveArticleAmount} from '../../requests'

export default class Dashboard extends Component {

    constructor(){
        super()
        this.articleAmount = createRef()
    }


    initArticleChart = ( ) => {
        // 请求echarts的数据
        saveArticleAmount().then((res)=>{
            const option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // data:['一月',' 二月','三月','四月','五月','六月']
                    data:res.amount.map(item => item.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    // data: [820, 932, 901, 934, 1290, 1330, 1320],
                    data:res.amount.map(item => item.value),
                    type: 'line',
                    areaStyle: {}
                }]
            };
        this.articleChart.setOption(option)

        })
        // const option  = {
        //     title :{
        //         tetx:'echarts 入门示例'
        //     },
        //     tooltip:{},
        //     legend:{
        //         data:['销量']
        //     },
        //     xAxis:{
        //         data:['一月',' 二月','三月','四月','五月','六月']
        //     },
        //     yAxis:{},
        //     series:[{
        //         name:'销量',
        //         type:'bar',
        //         data:[5,20,36,10,10,20]
        //     }]
        // }

       
    }

    componentDidMount(){
        this.articleChart  = echarts.init(this.articleAmount.current)

        this.initArticleChart()
    }
    // math color
    color = () => {
        return ("#"+(Math.random()*0Xffffff<<0).toString(16))
    }

    render() {
        return (
            <>
                <Card
                    title="概览"
                    bordered={false}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}> 
                            <div className="qx-gutter-box" style={{backgroundColor:this.color()}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}> 
                            <div className="qx-gutter-box" style={{backgroundColor:this.color()}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}> 
                            <div className="qx-gutter-box" style={{backgroundColor:this.color()}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}> 
                            <div className="qx-gutter-box" style={{backgroundColor:this.color()}}>col-6</div>
                        </Col>
                    </Row>
                </Card>

                <Card
                    title="最近浏览量"
                    bordered={false}
                >
                    <div
                        ref={this.articleAmount}
                        style={{height:"500px"}}
                    />
                </Card>
            </>
        )
    }
}
