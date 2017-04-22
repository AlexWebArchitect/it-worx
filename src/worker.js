const ADD_TODO = 'ADD_TODO'
const EDIT_TODO = 'EDIT_TODO'
const DELETE_TODO = 'DELETE_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const COMPLETE_ALL = 'COMPLETE_ALL'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

// Todo: add log and methods to read from it?

const state = {
    todos: []
}

self.onmessage =function(event) {
    const {type, payload} = event.data
    switch(type){
       
        case ADD_TODO :
            state.todos.push({
                id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1,
                text: payload,
                completed: false
            })
            self.postMessage({type: ADD_TODO, payload: state.todos})
            break
        case COMPLETE_TODO :
            const todo = state.todos.find(todo => todo.id == payload) 
            if(!!todo) todo.completed = true   
            self.postMessage({type: ADD_TODO, payload: state.todos})    
            break
        case DELETE_TODO :
            state.todos = state.todos.filter(todo => todo.id == payload)
            self.postMessage({type: ADD_TODO, payload: state.todos})   
        default :
            self.postMessage({type, payload})
    }
}