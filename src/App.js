import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';
import { NotificationContainer } from 'react-notifications';

import MainPage from './containers/main-page/main-page';
import Login from './containers/login/login';
import Register from './containers/register/register';

import store from './store/store';
import history from './helpers/history'
import ROUTES from './constants/routes'
import Auth from "./services/Auth";
const { INDEX, MAIN, LOGIN, REGISTER } = ROUTES;

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route exact path={INDEX} render={()=>(
							<Redirect to={MAIN}/>
						)} />
						<Route exact path={MAIN} component={MainPage}/>
						<Route exact path={LOGIN} render={() => (
							Auth.authCheck() ? <Redirect to={MAIN}/> : <Login/>
						)}/>
						<Route exact path={REGISTER} render={() =>
							Auth.authCheck() ? <Redirect to={MainPage}/> : <Register/>
						}/>
					</Switch>
				</Router>
				<NotificationContainer/>
			</Provider>
		);
	}
}

export default App;
