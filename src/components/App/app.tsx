import * as React from 'react'
import * as CONST from '../../constants'
import itworx from '../../itworx'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as styles from './app.css'

interface Props {
  /* empty */
}

interface State {
  /* empty */
}

export default class App extends React.Component<Props, State>{

  render() {
    return (
      <div className={styles.normal}>
        <Header/>
        <MainSection />
      </div>
    )
  }
}
/*
  TODO: Add localStorage to save    --done
  TODO: Check version               --done
*/