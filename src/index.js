import deepFreeze from 'deep-freeze'
import expect from 'expect'
import { createStore, combineReducers } from 'redux'
import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from 'react'

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
		  return {
		 		id: action.id,
		 		text: action.text,
		 		completed: false
			}
		case 'TOGGLE_TODO':
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

let nextTodoId = 0

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

const store = createStore(todoApp)

class TodoApp extends Component {
	<div>
		<button onClick = { () => {
			store.dispatch({
				 type: 'ADD_TODO',
				 text: 'Test',
				 id: nextTodoId++
			})
		}}>
		</button>
		<ul>
			{
				this.props.todos.map( todo =>
					<li>
						{todo.text}
					</li>
				)
			}
		</ul>
	</div>
}

const render = () => {
	ReactDOM.render(
		<TodoApp todos={store.getState().todos}/>,
		document.getElementById('root')
	)
}

store.getSTate(store.getState)

store.subscribe(render)
render()

