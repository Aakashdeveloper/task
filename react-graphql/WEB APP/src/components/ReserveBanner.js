import React from 'react';
import { Link} from 'react-router-dom'

const ReservationBanner = () => {
    return(
        <div>
            <img src={'https://a0.muscache.com/pictures/74f162be-e062-489a-bf74-16194efdeff9.jpg'}/>
            <div className="imageText">
                <p>All Set For Vacations</p>
                <p>Check Your Reservation</p>
                <Link to="/" className="btn btn-info btnbanner"> Book Now </Link>
                <Link to="/reservation" className="btn btn-info btnbanner1" > Check Reservation </Link>
            </div>
        </div>
    )
}

export default ReservationBanner