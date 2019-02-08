import React from 'react';
import { Link} from 'react-router-dom'

const Banner = () => {
    return(
        <div>
            <img src={'https://a0.muscache.com/pictures/a430c412-63bc-45f5-8a13-55647449a0b1.jpg'}/>
            <div className="imageText">
                <p>Ready For Vacations?</p>
                <Link to="/" className="btn btn-info btnbanner"> Book Now </Link>
                <Link to="/reservation" className="btn btn-info btnbanner1" > Check Reservation </Link>
            </div>
        </div>
    )
}

export default Banner