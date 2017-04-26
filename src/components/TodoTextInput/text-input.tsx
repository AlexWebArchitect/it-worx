import * as React from 'react'
import * as styles from './text-input.css'

interface Props {
  text?: string
  placeholder?: string
  newTodo?: boolean
  editing?: boolean
  onSave: (text: string) => any
};

interface State {
  text: string
};

export default class TodoTextInput extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.state = {
      text: this.props.text || ''
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    const text = e.target.value.trim()
    if (!this.props.newTodo)  this.props.onSave(text)
    
  }

  render() {
    
    const classes = [
      this.props.editing ? styles.edit : null,
      this.props.newTodo ? styles.new : null,
    ].join(' ')

    return (
      <input className={classes}
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} 
        data-cy="todo input" />
    )
  }
}