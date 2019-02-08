import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import { Layout} from 'antd';
import './styles.css'
/**
 * @description App Parent Container
 * @type Container
 */
export default class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props){
        super(props);

    }
    /**
     * ComponentDidMount Hook
     */
    componentDidMount(){

    }
    /**
     * Render Method
     * @returns {*}
     */
    render() {
        return (
            <Layout className="App">
                <main>
                    <Route exact path="/" component={Home} />
                </main>
            </Layout>
        )
    }
}

Main.displayName = "App";

