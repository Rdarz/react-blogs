import React, { Component } from 'react'
import {
	Route,
	Switch,
	withRouter,
	BrowserRouter
	// Redirect
} from 'react-router-dom'
import routesList from './routes'

class App extends Component {
	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<Switch>
						{routesList.map((route, index) => (
							<Route exact={route.exactPath || false} path={route.path} component={route.component} key={index} />
						))}
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}
export default withRouter(App)
