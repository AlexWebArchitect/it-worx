export const load = () => JSON.parse(window.localStorage.getItem('todos'))
export const save = (todos) => window.localStorage.setItem('todos', JSON.stringify(todos))
export const clear = () => window.localStorage.clear()