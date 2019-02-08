import React,{Component} from 'react';
import Reserve from './BookNow';

const RenderHotel = ({hotelData}) => {
    if(hotelData){
        return hotelData.map((item,index)=>{
            return(

                    <div className="d-inline-block p-2" key={index}>
                            <div className="card mainBox">
                                <h2 href="{item.City_Link}" target="_blank" className="city_name card-heading">{item.name}</h2>
                                <img className="card-img-top" src={`${item.image}`} alt="city_image"/>
                                <hr/>
                                <div className="card-body">
                                    
                                    <h5 className="card-title">
                                    <span className="amenities"><i class="fa fa-wifi" aria-hidden="true"></i> Wifi</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="amenities"><i class="fas fa-utensils" aria-hidden="true"></i> BreakFast</span>
                                    <h6 className="country">
                                    <i>{item.Country}</i></h6></h5>
                                    <p className="card-text">
                                        
                                    <span >Available: <i className="fas fa-bed" aria-hidden="true"></i> 10 </span>
                                    <p>Cost:  <i className="fa fa-usd" aria-hidden="true"></i> {item.price}</p>
                                    
                                    </p>
                                
                                    <a href="#" className="detailbtn" data-toggle="modal" 
                                         data-target={'#hotel'+index}  >
                                                Learn More
                                    </a>
                                    <a href="#" className="reserveBtn" data-toggle="modal" 
                                         data-target={'#book'+index}  >
                                                Reserve
                                    </a>
                                </div>
                            </div>
                            <div className="modal" id={'hotel'+index}>
                                <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h4 className="modal-title">
                                        <img className="flag" src={`${item.image}`}/>
                                        <p>{item.name}</p>
                                        <p><i class="fas fa-map-marker-alt"></i> {item.city}</p>  
                                        <span>{item.details}</span> 
                                    </h4>
                                    </div>
                                    
                                    <div className="modal-body">
                                            <span className="badge badge-warning">Facilites: {item.Population}</span><br/>
                                            <span className="amenities"><i class="fa fa-wifi" aria-hidden="true"></i> Wifi</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className="amenities"><i class="fa fa-spa" aria-hidden="true"></i> Spa</span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className="amenities"><i class="fas fa-swimming-pool" aria-hidden="true"></i>Swimming pool</span>
                                            <br/>
                                            <span className="amenities"><i class="fas fa-car" aria-hidden="true"></i> Praking</span>
                                            <hr/>
                                            <span className="badge badge-warning">Cost: {item.Population}</span><br/>
                                            <span className="amenities"><i class="fa fa-dollar" aria-hidden="true"></i>  {item.price}/night</span>
                                    </div>
                                    
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            <div className="modal" id={'book'+index}>
                                <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h4 className="modal-title">
                                    <center>
                                    <h1 className="reservr">Reserve</h1>
                                    </center>
                                    </h4>
                                    </div>
                                    
                                    <div className="modal-body bookmodel">
                                            <Reserve/>
                                     </div>
                                    
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                        
                    </div>
            )
        })
    }
}

const GymList = (props) => {
    return(
        <div className="container">
            {RenderHotel(props)}
        </div>
    )
}

export default GymList;