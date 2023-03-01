import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Detail: React.FC = () => {
	const [msg, setMessage] = useState('默认')
	const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	useEffect(() => {
		console.log(params, ' detail useParams')
		console.log(searchParams.get('add'), ' detail useSearchParams')
	})
	return (
		<>
			<div>{msg}</div>
		</>
	)
}

export default Detail
