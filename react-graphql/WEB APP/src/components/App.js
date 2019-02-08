import React , {Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

//Containers
import Home from '../containers/Home';
import Addnew from '../containers/AddNew';


class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <div className="logo"></div>
                    <br/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/addnew" component={Addnew}></Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;