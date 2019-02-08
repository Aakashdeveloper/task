/**
 * Pre process a container with redux wrappers
 */
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
export default function(container,pluginsConfiguration){

    if(pluginsConfiguration.connect){
        container = connect.apply(this,pluginsConfiguration.connect)(container)
    }
    if(pluginsConfiguration.withRouter){
        container = withRouter(container);
    }
    return container;
}
