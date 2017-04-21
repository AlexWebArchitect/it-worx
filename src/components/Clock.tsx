import * as React from 'react'
import action$ from '../actions/stream'
import itworx from '../actions/itworx'

interface Props {}
interface State {
    time: number
}

interface Action {
    type: string
    payload?: any
}


export default class Clock extends React.Component <Props, State> {

    private int: number

    constructor(props){
        super(props)
        this.state={time: Date.now()}
        this.getTime = this.getTime.bind(this)
        itworx.subscribe('TICK', this.getTime)
    }

    componentDidMount(){
      
       this.int = window.setInterval(()=>  itworx.dispatch({type: 'TICK', payload: Date.now()}), 1000)
    }

    componentWillUnmount(){
        window.clearInterval(this.int)
        itworx.unsubscribe('TICK', this.getTime)
    }

    getTime(action: Action) {
        this.setState({time: action.payload})
    }

    render() {
        
        return <h4>{new Date(this.state.time).toString()}</h4>
    }
}