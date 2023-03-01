import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const List: React.FC = () => {
	const [msg, setMessage] = useState('默认')
	const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	useEffect(() => {
		console.log(params, 'useParams')
		console.log(searchParams, 'useSearchParams')
	})
	return (
		<>
			<div>{msg}</div>
		</>
	)
}

export default List
