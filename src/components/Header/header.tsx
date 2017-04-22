import * as React from 'react'

interface Props {
  addTodo: (todo: TodoItemData) => any;
}

interface State {
  /* empty */
}

class Header extends React.Component<Props, State> {

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
      </header>
    );
  }
}