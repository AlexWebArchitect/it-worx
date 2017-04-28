import * as React from 'react'
import * as TodoActions from '../../constants/actions'
import TodoItem from '../TodoItem'
import Footer from '../Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import itworx from '../../itworx'
import * as API from '../../helpers/storageAPI'
import * as  CONST from '../../constants'
import * as styles from './main-section.css'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

interface Props {
}

interface State {
  todos: TodoItemData[]
  filter: TodoFilterType
}

export default class MainSection extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.state = { filter: SHOW_ALL, todos: [] }
    this.handleClearCompleted = this.handleClearCompleted.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.reloadTodos = this.reloadTodos.bind(this)
  }

  componentDidMount(){
    itworx.subscribe(CONST.RELOAD_TODOS, this.reloadTodos)
    itworx.dispatch({type: CONST.RELOAD_TODOS, payload: API.load()})
  }

  componentWillUnmount() {
    itworx.unsubscribe(CONST.RELOAD_TODOS, this.reloadTodos)
  }

  reloadTodos(action: Action) {
    this.setState({todos: action.payload})
    API.save(action.payload)
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.state.todos.some(todo => todo.completed)
    const type = CONST.CLEAR_COMPLETED
    if (atLeastOneCompleted) itworx.dispatch({type})
  }

  handleShow(filter: TodoFilterType) {
    this.setState({ filter })
  }

  renderToggleAll(completedCount: number) {
    const { todos } = this.state
    if (todos.length > 0) {
      return (
        <input
          className={styles.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={()=>itworx.dispatch({type: CONST.COMPLETE_ALL})} 
          data-cy="todo toggle all"/>
      )
    }
  }

  renderFooter(completedCount: number) {
    const { filter, todos } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow} />
      );
    }
  }

  render() {
    const { filter, todos } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) => (
        todo.completed ? count + 1 : count
    ), 0)

    return (
      <section className={styles.main}>
        {this.renderToggleAll(completedCount)}
        <ul className={styles.normal} 
            data-cy="todo list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}