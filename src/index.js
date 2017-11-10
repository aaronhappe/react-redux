import deepFreeze from 'deep-freeze'
import expect from 'expect'
import { createStore, combineReducers } from 'redux'
// import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from 'react'
import Reducer from './reducers/index'
import { actionTodoDispatch } from './actions/index'

const FilterLink = ({
	filter,
	children
}) => {
	return (
		<a href="#"
			onClick={ e => {
				 e.preventDefault()
				 store.dispatch({
				 	type: 'SET_VISIBILITY_FILTER',
				 	filter
				 })
				}
			}
		>
		{children}
		</a>
	)
}

const getVisibileTodos = (
	todos,
	filter
) => {
	switch(filter) {
		case 'SHOW_ALL':
		 	return todos
		case 'SHOW_COMPLETED':
			return todos.filter(
				t => t.completed
			)
		case 'SHOW_ACTIVE':
			return todos.filter(
				t => t.active
			)
		default: todos
	}
}

const store = createStore(Reducer)

let nextTodoId = 0

const ADD_TODO = ''

class AddTodoView extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<input ref={node => {
					this.input = node
				}}/>
				<button onClick = { () => {
					{actionTodoDispatch.addTodo(nextTodoId++, this.input.value)}
					{this.props.subscribe()}
				}}>wa??</button>
			</div>
		)
	}
}

class TodoApp extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {
			todos,
			visibilityFilter
		} = this.props

		const visibleTodos = getVisibileTodos(
			todos,
			visibilityFilter
		)
		return (
			<div>
				<AddTodoView subscribe={this.props.subscribe} />
				<ul>
				{
				visibleTodos.map( todo =>
					<li key={todo.id} className={'checked-' + todo.completed}
						onClick={() => {
							store.dispatch(
							{
								type: 'ASDF_ASDF'
							}
							)
						}
					}>
						{todo.text}
					</li>
				)
				}
				</ul>
				<p>
					Show:
					{' '}
					<FilterLink
						filter='SHOW_ALL'
					>
						ALL
					</FilterLink>
					{' '}
					<FilterLink
						filter='SHOW_ACTIVE'
					>
						ACTIVE
					</FilterLink>
					{' '}
					<FilterLink
						filter='SHOW_COMPLETED'
					>
						COMPLETE
					</FilterLink>
				</p>
			</div>
		)
	}
}

const render = () => {
	ReactDOM.render(
		<TodoApp {...store.getState()} subscribe={subScribeFunc}/>,
		document.getElementById('root')
	)
	console.log(store.getState())
}

const subScribeFunc = () => {
	store.subscribe(render)
	console.log('has been subscribed')
}

render()
