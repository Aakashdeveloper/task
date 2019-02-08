import React from 'react';
import './header.css';

const navbar={
    color:'white'
}

const Header = () => {
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span> 
                </button>
                <a className="navbar-brand" style={navbar}>JUMPCUT</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li className="active"><a>SEQUENCER</a></li>
                   
                </ul>
               
                </div>
            </div>
            </nav>
    )
}

export default Header;
