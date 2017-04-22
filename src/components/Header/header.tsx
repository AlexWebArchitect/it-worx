import * as React from 'react'
import TodoTextInput from '../TodoTextInput';

interface Props {
  addTodo: (todo: TodoItemData) => any;
}

interface State {
  /* empty */
}

export default class Header extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(text: string) {
    if (text.length) this.props.addTodo({ text })
  }

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?" />
      </header>
    );
  }
}