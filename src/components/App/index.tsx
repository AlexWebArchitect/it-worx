import * as React from 'react'
import {Button} from 'react-bootstrap'
import List from '../List'
import Clock from '../Clock'

import action$ from '../../actions/stream'

// const style = require('./App.css')

interface Props {}

interface State {}

export default class App extends React.Component<Props, State>{

  render() {
    return  (
        <div>
            <h1> Hello React </h1> 
            <Clock/>
            <Button
                onClick={()=>action$.next({type:'CLICK'})} 
                bsStyle="default" 
                bsSize="large">
                Time
            </Button>
            <List/>
        </div>
    
    )
  }
}