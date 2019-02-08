import React, {Component} from "react";
import "./styles.css";
import {Layout,Table,Avatar,Popover,Button} from 'antd';
/**
 * @description City List Component
 * @type Container
 */
export default class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props) {
        super(props);
        this.columns = [
            {
                title : "",
                dataIndex : "image",
                render : (row)=>{
                    return <Avatar src = {row} size = {"large"}/>
                }
            },
            {
                title : "Name",
                dataIndex : "name"
            },{
                title : "Country",
                dataIndex : "country"
            },{
                title : "Population",
                dataIndex : "population"
            },{
                title : "Description",
                dataIndex : "description",
                render : (row,record)=>{
                    return (
                        <Popover content={row} title={record.name}>
                            <Button type="primary">See Description</Button>
                        </Popover>
                    )
                }
            },{
                title : "Link",
                dataIndex : "url",
                render : (row)=>{
                    return <a href={row}>{row}</a>
                }
            }
        ]

    }

    /**
     * ComponentDidMount Hook
     */
    componentDidMount() {

    }

    /**
     * Render Method
     * @returns {*}
     */
    render() {
        const {data,loading} = this.props;

        return (
            <Layout className="card-list">
                <Table
                    rowKey="url"
                    columns={this.columns}
                    dataSource = {data || []}
                    loading = {loading}
                />
            </Layout>
        )
    }
}

Main.displayName = "City-List";