import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



//actions
import { GetGymList } from '../actions';


//Component
import GymList from '../components/GymList';


class Home extends Component{

    componentDidMount(){
        this.props.GetGymList();
    }

    render(){
        return(
            <div>
                <center>
                <img src={'https://i.ibb.co/vdvVmkm/logo.png'} className="logo"/>
                </center>
                <GymList hotelData={this.props.hotellist.hotels}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        hotellist:state.hotelListState
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({GetAllHotels},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);