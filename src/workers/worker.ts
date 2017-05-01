import * as Actions from '../constants/actions'

interface TodoState {
    todos: Array<TodoItemData>
}

const state: TodoState = {
    todos: []
}

function onMessage(event) {
    const {type, payload}: Action = event.data
    switch(type){
       
        case Actions.ADD_TODO :
            state.todos = [{
                id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1,
                text: payload,
                completed: false
            }, ...state.todos]
            self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload: state.todos}])
            break
        case Actions.EDIT_TODO : {
            const todo = state.todos.find(todo => todo.id == payload.id)
            if(!!todo) {
                todo.text = payload.text
                self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload: state.todos}])  
            }
            break
        }
        case Actions.DELETE_TODO :
            state.todos = state.todos.filter(todo => todo.id !== payload)
            self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload: state.todos}])  
            break 
        case Actions.COMPLETE_TODO : {
            const todo = state.todos.find(todo => todo.id == payload) 
            if(!!todo) todo.completed = true   
            self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload: state.todos}])    
            break
        }
        case Actions.COMPLETE_ALL :
            state.todos.forEach(todo => todo.completed = true )
            self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload: state.todos}]) 
            break
        case Actions.CLEAR_COMPLETED :
            state.todos = state.todos.filter(todo => !todo.completed)
            self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload: state.todos}])  
            break
        case Actions.RELOAD_TODOS :
            state.todos = payload
            self.postMessage.apply(null, [{type: Actions.RELOAD_TODOS, payload}])  
            break
        default :
           
    }
}

self.addEventListener('message', onMessage)