
// import deepFreeze from 'deep-freeze'
// import expect from 'expect'
// import { createStore, combineReducers } from 'redux'
// import App from './components/App'
// import React from 'react'
// import ReactDOM from 'react-dom'

// console.log('import app')

// const todo = (state, action) => {
// 	switch (action.type) {
// 		case 'ADD_TODO':
// 		  return {
// 		 		id: action.id,
// 		 		text: action.text,
// 		 		completed: false
// 			}
// 		case 'TOGGLE_TODO':
// 			if(state.id !== action.id) {
// 		 		return state
// 			}
// 			return {
// 				...state,
// 				completed: !state.completed
// 			}
// 		default: 
// 			return state
// 	}
// }

// const todos = (state = [], action) => {
// 	switch(action.type) {
// 		case 'ADD_TODO':
// 			return [
// 				...state,
// 				todo(undefined, action)
// 			]
// 	case 'TOGGLE_TODO':
// 		return state.map(t => todo(t, action))
// 		default:
// 			return state;
// 	}
// }

// const visibilityFilter = (
// 	state = 'SHOW_ALL',
// 	action 
// 	) => {
// 		switch(action.type) {
// 			case 'SET_VISIBILITY_FILTER':
// 				return action.filter
// 			default:
// 				return state
// 		}
// 	}

// const todoApp = combineReducers({
// 	todos,
// 	visibilityFilter
// })

// const store = createStore(todoApp);

// const render = () => {
// 	ReactDOM.render(
// 		<App store={store} storeDispatch={store.dispatch}/>,
// 		document.getElementById('root')
// 	)
// }

// store.subscribe(render);

// render()

// console.log('seems to work')

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// console.log(window)