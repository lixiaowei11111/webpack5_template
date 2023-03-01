// App.tsx

import React from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { AppContext } from './components/AppContext'

const App = () => {
	const params = useParams()
	console.log(params, 'useParams()')

	return (
		<div>
			<span>12312312331</span>
			<AppContext></AppContext>
		</div>
	)
}

export default App
