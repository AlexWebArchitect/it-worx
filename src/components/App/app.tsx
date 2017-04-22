import * as React from 'react'
import * as CONST from '../../constants'
import itworx from '../../itworx'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as styles from './app.css'

interface Props {
  todos: TodoItemData[]
}

interface State {
  /* empty */
}

export default class App extends React.Component<Props, State>{
  render() {
    const { todos, children } = this.props;
    console.log('app var ', itworx.ver)
    return (
      <div className={styles.normal}>
        <Header/>
        {/*<MainSection todos={todos} />*/}
        {children}
      </div>
    )
  }
}