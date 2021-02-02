import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
/* import GuardedRoute from '../GuardRoute/GuardRoute' */
import SignInComponent from '../../../modules/SignIn/SignInComponent'
import DashboardComponent from '../../../modules/Dashboard/DashboardComponent';
import UserComponent from '../../../modules/Users/UserComponent';
import ProductComponent from '../../../modules/Products/ProductComponent';
import ExchangeComponent from '../../../modules/ExchangeRates/ExchangeComponent';

class RouterComponent extends React.Component {  
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={SignInComponent}/>
          <Route exact path='/dash/:path?'>
            <DashboardComponent>
              <Switch>
                <Route exact path='/dash' component={ExchangeComponent}/>
                <Route exact path='/dash/user' component={UserComponent}/>
                <Route exact path='/dash/product' component={ProductComponent}/>
              </Switch>
            </DashboardComponent>
          </Route> : 
          <Redirect to='/' />
          {/* <GuardedRoute path='/dashboard' component={DashboardComponent} auth=''/> */}
        </Switch>
      </Router>
    )
  }
}

export default RouterComponent;