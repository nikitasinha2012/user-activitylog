import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import LandingPage from './Components/LandingPage';


const Routes = () => {
    return(
        <Router>
            <Switch>
            <Route path="/" component={LandingPage} exact={true} />
            
            </Switch>
        </Router>
    );
    }
export { Routes }


