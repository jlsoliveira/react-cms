import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Login from '../containers/Login'
import Dashboard from '../containers/Dashboard'
import Banners from '../containers/Banners'
import Contacts from '../containers/Contacts'
import Products from '../containers/Products'
import Users from '../containers/Users'
import ProductLines from '../containers/ProductLines'

import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<PublicRoute component={Login} path={'/'} exact />
			<PublicRoute component={Login} path={'/login'} />
			<PrivateRoute component={Dashboard} path={'/dashboard'} />
			<PrivateRoute component={Banners} path={'/banners'} />
			<PrivateRoute component={Contacts} path={'/contatos'} />
			<PrivateRoute component={Products} path={'/produtos'} />
			<PrivateRoute component={ProductLines} path={'/linha-produto'} />
			<PrivateRoute component={Users} path={'/usuarios'} />
		</Switch>
	</BrowserRouter>
)

export default Router