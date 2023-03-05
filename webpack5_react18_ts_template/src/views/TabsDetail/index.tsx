// data router nesting

import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

const TabsDetail: React.FC = () => {
	const location = useLocation()
	console.log(location, 'useLocation')

	return (
		<>
			<div>
				<div>tabs</div>
				<NavLink to="leads">Leads</NavLink>
				<NavLink to="customer">Customer</NavLink>
			</div>
			<Outlet></Outlet>
		</>
	)
}

export default TabsDetail
