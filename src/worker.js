self.onmessage =function(event) {
    const {type, payload} = event.data
    switch(type){
        case 'TICK' :
            self.postMessage({ type, payload: payload- 60000 * 60 * 4 })
            break;
        default :
            self.postMessage({type, payload})
    }
}