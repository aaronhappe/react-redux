// import React from 'react'
// import { Component } from 'react'

// // import Footer from './Footer'
// // import AddTodo from '../containers/AddTodo'
// // import VisibleTodoList from '../containers/VisibleTodoList'

// // const App = () => (
// //   <div>
// //     <AddTodo />
// //     <VisibleTodoList />
// //     <Footer />
// //   </div>
// // )

// class App extends Component {
// 	constructor(props) {
// 		super(props)

// 		this.nextTodoId = 1  
// 		this.store = props.store
// 		this.todos = props.store.getState().todos
// 		this.storeDispatch = props.storeDispatch
// 		console.log(this.todos);
// 	}
// 	example(){
// 		return <div>asdf</div>
// 	}
// 	returnTodoText(){
// 			this.todos.map(todo => {
// 				return <li>todo.text</li>
// 			})
// 	}
// 	render() {
// 		return (
// 			<div>
// 				{this.example()}
// 				{this.nextTodoId}
// 				<button onClick={ () => {
// 					this.storeDispatch({
// 						type: 'ADD_TODO',
// 						text: 'Test',
// 						id: this.nextTodoId++
// 					})
// 				}

// 				}>aer</button>
// 				<ul>
// 					eo
// 					{ 
// 					}
// 				</ul>
// 			</div>
// 		)
// 	}
// }

// export default App
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
console.log(store)
export default App
