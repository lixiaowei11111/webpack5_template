import React, { Component, ReactNode } from 'react'
interface IState {
	hasError: boolean
}
export default class ErrorBoundary extends Component<any, IState> {
	constructor(props: any) {
		super(props)
		this.state = { hasError: false }
	}
	static getDerivedStateFromError(error: Error) {
		return { hasError: true }
	}
	componentDidCatch(error: Error, info: { componentStack: string }) {
		console.log('错误信息：', error)
		console.log('错误详情：', info)
	}
	render(): ReactNode {
		if (this.state.hasError) {
			return <h2>出错啦！</h2>
		}
		return this.props.children
	}
}
