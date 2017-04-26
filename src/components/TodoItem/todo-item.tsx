import * as React from 'react'
import itworx from '../../itworx'
import TodoTextInput from '../TodoTextInput'
import * as CONST from '../../constants'
import * as styles from './todo-item.css'

interface Props {
  todo: TodoItemData
}

interface State {
  editing: boolean
}

export default class TodoItem extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.state = {
      editing: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) itworx.dispatch({type: CONST.DELETE_TODO, payload: id}) 
    else  itworx.dispatch({type: CONST.EDIT_TODO, payload: {id, text}}) 
    this.setState({ editing: false })
  }

  render() {
    const { todo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className={styles.view}>
          <input className={styles.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={() => itworx.dispatch({type: CONST.COMPLETE_TODO, payload: todo.id})} 
            data-cy="todo toggle"/> 

          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>

          <button className={styles.destroy} 
              onClick={() => itworx.dispatch({type: CONST.DELETE_TODO, payload: todo.id})} />
        </div>
      );
    }

    const classes = [
        todo.completed ? styles.completed : null,
        this.state.editing ? styles.editing : styles.normal
      //  this.state.editing ? styles.normal : null
    ].join(' ')

    return (
      <li className={classes}>
        {element}
      </li>
    )
  }
}