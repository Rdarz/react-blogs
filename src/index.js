import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from 'Components/Home'
import Blog from 'Components/Blog'
import { Provider } from 'react-redux'
import createStore from 'Redux/createStore'
import 'bootstrap/dist/css/bootstrap.min.css'

const routing = (
	<Router>
		<Switch>
			<Route path="/home" exact component={Home} />
			<Route path="/blog/*" exact component={Blog} />
			<Redirect exact from="/" to="home" />
		</Switch>
	</Router>
)

ReactDOM.render(<Provider store={createStore()}>{routing}</Provider>, document.getElementById('root'))
