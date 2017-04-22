import * as React from 'react';
import * as TodoActions from '../../constants/actions';
import TodoItem from '../TodoItem';
import Footer from '../Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters';
// import { connect } from 'react-redux';
import * as styles from './main-section.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

interface Props {
  todos: TodoItemData[];
  actions: typeof TodoActions;
};

interface State {
  filter: TodoFilterType;
};

export default class MainSection extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.state = { filter: SHOW_ALL }
    this.handleClearCompleted = this.handleClearCompleted.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter: TodoFilterType) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount: number) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className={styles.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll} />
      );
    }
  }

  renderFooter(completedCount: number) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

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
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);

    return (
      <section className={styles.main}>
        {this.renderToggleAll(completedCount)}
        <ul className={styles.normal}>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}