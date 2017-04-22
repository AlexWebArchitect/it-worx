import * as React from 'react'
import Clock from '../Clock'


interface Props {}

interface State {}

export default class App extends React.Component<Props, State>{

  render() {
    return  (
        <div>
            <h1> Hello React </h1> 
            <Clock/>
        </div>
    
    )
  }
}