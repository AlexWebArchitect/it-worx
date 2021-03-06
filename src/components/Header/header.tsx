import * as React from 'react'
import itworx from '../../itworx'
import TodoTextInput from '../TodoTextInput'
import * as CONST from '../../constants'

interface Props {
  /* empty */
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
    if (text.length) itworx.dispatch({type: CONST.ADD_TODO, payload: text})
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