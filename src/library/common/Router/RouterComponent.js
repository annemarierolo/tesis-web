import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import GuardedRoute from '../GuardRoute/GuardRoute'
import SignInComponent from '../../../modules/SignIn/SignInComponent'
import DashboardComponent from '../../../modules/Dashboard/DashboardComponent';
import UserComponent from '../../../modules/Users/UserComponent';
import ProductContainerComponent from '../../../modules/ProductsContainer/ProductContainerComponent';
import ExchangeComponent from '../../../modules/ExchangeRates/ExchangeComponent';
import NotFoundComponent from '../../../modules/NotFound/NotFoundComponent';
import ReportsComponent from '../../../modules/Reports/ReportsComponent';

class RouterComponent extends React.Component {  
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={SignInComponent}/>
          <Route exact path='/notfound' component={NotFoundComponent}/>
          <GuardedRoute path='/dash/:path?' auth=''>
            <DashboardComponent>
              <Switch>
                {/* <GuardedRoute exact path='/dash' component={ProductContainerComponent} roles={["Gerente General", "Gerente de Logística"]}/> */}
                <GuardedRoute exact path='/dash/user' component={UserComponent} roles={["Gerente General"]}/>
                <GuardedRoute exact path='/dash/product' component={ProductContainerComponent} roles={["Gerente General", "Gerente de Logística"]}/>
                <GuardedRoute exact path='/dash/exchange' component={ExchangeComponent} roles={["Gerente General"]}/>
                <GuardedRoute exact path='/dash/report' component={ReportsComponent} roles={["Gerente General"]}/>
                <Route path='*'>
                  <Redirect to='/notfound' />
                </Route>
              </Switch>
            </DashboardComponent>
          </GuardedRoute> : 
          <Redirect to='/' />
          {/* <GuardedRoute path='/dashboard' component={DashboardComponent} auth=''/> */}
        </Switch>
      </Router>
    )
  }
}

export default RouterComponent;