import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
const Home: React.FC = () => {
	const navigate = useNavigate()
	const handleNavigate = () => {
		console.log(navigate, 'navigate')
		navigate('/object/customer', {
			replace: true,
			state: { a: 1, b: 2 },
		})
	}
	return (
		<>
			<h3>home</h3>
			<NavLink to="/object" state={{ id: 12, name: 'state' }}>
				tabs
			</NavLink>
			<Link to="/list/1">detail1</Link>
			<Link to="/list/2">detail2</Link>
			<Link to="/detail/3">detail3</Link>
			<Link to="/detail/4?add=2333">detail4</Link>
			<Button onClick={handleNavigate}>antd click</Button>
		</>
	)
}

export default Home
