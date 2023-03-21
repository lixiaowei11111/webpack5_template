// App.tsx

import React from 'react'
import { useParams } from 'react-router-dom'

import { AppContext } from './components/AppContext'
import '@/styles/theme.scss'

const App = () => {
	const params = useParams()
	console.log(params, 'useParams()')

	return (
		<div className='app'>
			<span style={{ color: '#bfa' }}>12312312331</span>
			<AppContext></AppContext>
		</div>
	)
}

export default App
