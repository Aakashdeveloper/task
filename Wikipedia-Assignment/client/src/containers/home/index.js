import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCities} from '../../redux/actions';
import preProcess from '../preprocess';
import {Layout,Card,message,} from 'antd';
import CityList from '../../components/city-list'
import './styles.css';
const {Content,Header } = Layout;
/**
 * @description Home Container
 * @type Container
 */
class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {
            loading : true
        }
    }
    /**
     * ComponentDidMount Hook
     */
    componentDidMount(){
        this.getCities();
    }

    /**
     * Fetch Cities
     * @returns {Promise.<void>}
     */
    async getCities(){
        try {
            const {getCities} = this.props;
            const action = await getCities();
            if(action.error){
               throw action.payload.response ? action.payload.response.data : "Server not available";
            }
        } catch(e){
            message.error("Error while fetching cities");
        }
        this.setState({
            loading : false
        })
    }

    /**
     * Render Method
     * @returns {*}
     */
    render() {
        const {loading} = this.state;
        const {cities} = this.props;

        return (
            <Content>
                <Header className="header">
                    List of metropolitan areas in Asia
                </Header>
                <div className="home-container">
                    <CityList  data = {cities} loading = {loading}/>
                </div>
            </Content>
        )
    }
}
/**
 * Bind Redux Actions
 * @param dispatch
 * @returns {{Object}}
 */
const bindAction = (dispatch)=>{
    return {
        getCities : ()=>{
            return dispatch(getCities())
        }
    }
};
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = ({cities}) => {
    return {
        cities
    }
};
Main.displayName = "Home";
export default preProcess(Main,{
    withRouter : true,
    connect : [mapStateToProps,bindAction]
});
