import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import { BookingRecord } from '../actions';


//Component
import ReservationBook from '../components/ReservationBook';
import ReservationBanner from '../components/ReserveBanner';


class Reservation extends Component{

    componentDidMount(){
        this.props.BookingRecord()
    }
    render(){
        return(
            <div>
                <center>
                <img src={'https://i.ibb.co/vdvVmkm/logo.png'} className="logo"/>
                </center>
                <ReservationBanner/>
                <ReservationBook reservationData={this.props.Booking.bookinglist}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        Booking:state.reservationData
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({BookingRecord},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Reservation);