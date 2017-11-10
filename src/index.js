import deepFreeze from 'deep-freeze'
import expect from 'expect'
import { createStore, combineReducers } from 'redux'
// import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from 'react'

class todosAction {
	constructor(type,id,text,completed){
		this.type = type
		this.text = text
		this.id = id
		this.completed = completed
	}
	addTodo (type, id, text){
		return (
			{
				type: type,
				id: id,
				text: text,
				completed: false
			}
		)
	}
	toggleTodo (type, id) {
		return (
			{
				type: type,
				id: id
			}
		)
	}
}

const addTodoObj = new todosAction()
console.log('t')

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
		  return {
		 		id: action.id,
		 		text: action.text,
		 		completed: false
			}
		case 'TOGGLE_TODO':
		console.log(state)
			if(state.id !== action.id) {
		 		return state
			}
			return {
				...state,
				completed: !state.completed
			}
		default: 
			return state
	}
}

const todos = (state = [], action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			]
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action))
			default:
				return state;
	}
}

const visibilityFilter = (
	state = 'SHOW_ALL',
	action 
	) => {
		switch(action.type) {
			case 'SET_VISIBILITY_FILTER':
				return action.filter
			default:
				return state
		}
}

const todoApp = combineReducers({
	todos,
	visibilityFilter
})

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

const store = createStore(todoApp)

let nextTodoId = 0

const ADD_TODO = ''

class TodoApp extends Component {
	
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
			<input ref={node => {
				this.input = node
			}}/>
			  <p>fefe</p>
				<button onClick = { () => {
					{ADD_TODO = addTodoObj.addTodo('ADD_TODO', nextTodoId, 'input and stuff')}
					store.dispatch(
						ADD_TODO
					)
					this.input.value = ''
				}}>Add Todo</button>
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
		<TodoApp {...store.getState()}/>,
		document.getElementById('root')
	)
	console.log(store.getState())
}

store.subscribe(render)
render()