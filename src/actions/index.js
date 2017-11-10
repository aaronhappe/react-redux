let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const catFunction = () => (
	console.log('rewer')
)

class ActionTodo {
	constructor(){
		// this.type = type
		// this.text = text
		// this.id = id
		// this.completed = completed
	}
	addTodo (id, text){
		// return (
			var ADD_TODO = {
				type: 'ADD_TODO',
				id: id,
				text: text,
				completed: false
			}
		// )
		store.dispatch(
			ADD_TODO
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

export const actionTodoDispatch = new ActionTodo()