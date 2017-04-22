import * as React from 'react'
import TodoTextInput from '../TodoTextInput'
import * as styles from './style.css'

interface Props {
  todo: TodoItemData
  editTodo: (todo: TodoItemData) => any
  deleteTodo: (id: number) => any
  completeTodo: (id: number) => any
};

interface State {
  editing: boolean
};

export default class TodoItem extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.state = {
      editing: false
    };
    this.handleSave = this.handleSave.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) this.props.deleteTodo(id)
    else this.props.editTodo({ id, text })
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

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
            onChange={() => completeTodo(todo.id)} />

          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>

          <button className={styles.destroy} onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    const classes = [
        todo.completed ? styles.completed : null,
        this.state.editing ? styles.editing : null,
        this.state.editing ? styles.normal : null
    ].join(' ')

    return (
      <li className={classes}>
        {element}
      </li>
    )
  }
}