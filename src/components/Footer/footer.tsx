import * as React from 'react'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../constants/filters'
import * as styles from './footer.css'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

const FILTER_TYPES = [
  SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
]

interface Props {
  filter: TodoFilterType
  activeCount: number
  completedCount: number
  onShow: (filter: TodoFilterType) => any
  onClearCompleted: () => any
}

interface State {
  /* empty */
}

export default class Footer extends React.Component<Props, State> {

  renderTodoCount() {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className={styles.count}
        data-cy="todo count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilterType) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = this.props

    const classes = [
        filter == selectedFilter ? styles.selected : null
    ].join(' ')

    return (
      <a className={classes}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={styles.clearCompleted} 
          onClick={onClearCompleted} 
          data-cy="todo clear completed">
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className={styles.normal}>
        {this.renderTodoCount()}
        <ul className={styles.filters}>
          {FILTER_TYPES.map((filter) =>
            <li key={filter}
              data-cy="todo filters">
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}