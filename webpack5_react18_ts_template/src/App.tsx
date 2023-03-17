// App.tsx

import React from 'react'
import { useParams } from 'react-router-dom'

import { AppContext } from './components/AppContext'
import '@/styles/theme.scss'
import index from '@/styles/index.css'

const App = () => {
	const params = useParams()
	console.log(params, 'useParams()')

	return (
		<div className={index.app}>
			<span>12312312331</span>
			<AppContext></AppContext>
		</div>
	)
}

export default App
