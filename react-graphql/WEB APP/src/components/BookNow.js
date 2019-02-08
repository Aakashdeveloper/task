import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



//actions
import { BookHotel } from '../actions';



class Reserve extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            hotel:'',
            date:''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeHotel = this.handleChangeHotel.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state)
    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeHotel(event) {
        this.setState({hotel: event.target.value});
    }
    handleChangeStartDate(event) {
        this.setState({startdate: event.target.value});
    }

    handleChangeEndDate(event) {
        this.setState({enddate: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("reaching here")
        this.props.BookHotel('5c42126787cff90024fcc5f0',this.state.startdate,this.state.enddate);
        alert("Your Booking Is Confirmed")
    }
    render(){
        return(
            <div className="container">
                
               <div className="booknow col-md-8 offset-md-2">
                    <div className="">
                    <form>
                    <div className="form-group">
                                                        <label for="name"><b>Your Name</b></label>
                                                        <input type="text" 
                                                                className="form-control" 
                                                                id="name"
                                                                value={this.state.name}
                                                                onChange={this.handleChangeName} />
                                                    </div>
                                                    <b>No. of Person</b>
                                                    <div class="radio">
                                                        <label><input type="radio" name="room"/>  1</label>
                                                        <label className="ncheckbox"><input type="radio" name="room" />   2</label>
                                                        <label className="ncheckbox"><input type="radio" name="room"/>  3</label>
                                                        <label className="ncheckbox"><input type="radio" name="room"/>  4</label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="date"><b>Check In</b></label>
                                                        <input type="date" 
                                                                className="form-control"
                                                                 id="date"
                                                                 value={this.state.startdate}
                                                                 onChange={this.handleChangeStartDate}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="date"><b>Check Out</b></label>
                                                        <input type="date" 
                                                                className="form-control"
                                                                 id="date"
                                                                 value={this.state.enddate}
                                                                 onChange={this.handleChangeEndDate}/>
                                                    </div>
                                                    <br/>
                                                    <input type="submit"
                                                             className="btn btn-success btn-block booknowbtn"
                                                             onClick={this.handleSubmit}
                                                             value="Book Hotel"/>
                                                    <br/><br/>
                    </form>
                    </div>
               </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({BookHotel},dispatch)
}

export default connect(null,mapDispatchToProps)(Reserve);