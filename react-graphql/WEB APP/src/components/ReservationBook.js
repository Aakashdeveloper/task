import React from 'react';

const RenderReservation = ({reservationData}) => {
    if(reservationData){
        return reservationData.map((item,index)=>{
            return(
                <div>
                <div class="media border p-3" key="index">
                    <img src={`${item.image}`}  class="mr-5 mt-5 box"/>
                    
                    <div class="media-body">
                    <br/><br/>
                        <h3>Your Reservation for {item.name} is Booked<small><i></i></small></h3>
                        <h5>You can CheckIn on {item.checkInDate} till 3:00pm</h5>
                        <h5>You need to pay Amount of <i class="fa fa-usd" aria-hidden="true"></i>{item.price}</h5>
                    </div>
                </div>
                <br/><br/>
                </div>
            )
        })
    }
}

const ReservationBook = (props) => {
    return(
        <div className="container">
            {RenderReservation(props)}
        </div>
    )
}

export default ReservationBook;