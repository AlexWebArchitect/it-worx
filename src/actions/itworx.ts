
class itworx {
    
    private worker: Worker
    private subscriptions: Map<string,Function[]>

    constructor(workerScript: string){
        
        this.worker = new Worker(workerScript)    
        this.subscriptions = new Map()
        this.handleMessage = this.handleMessage.bind(this)
        this.handleError = this.handleError.bind(this)
        this.worker.addEventListener('message', this.handleMessage )
        this.worker.addEventListener('error', this.handleError)
    }

    private handleMessage(event: MessageEvent){

        const {type} = event.data

        if(this.subscriptions.has(type)) {
            this.subscriptions.get(type).forEach( callback => {
                callback(event.data)
            })
        }
    }

    private handleError(event: MessageEvent){
        console.log(event)
    }

    public dispatch(action:Action) {
        this.worker.postMessage(action)
    }

    public subscribe(action: string, callback: Function) {

        const arr = this.subscriptions.has(action) 
            ? [...this.subscriptions.get(action), callback]
            : [callback]

        this.subscriptions.set(action, arr)

    }

    public unsubscribe( action: string, callback: Function) {

        if(!this.subscriptions.has(action)) return
        const arr = this.subscriptions.get(action)
            .filter(func => func!==callback)
        this.subscriptions.set(action,arr)
    }

    public terminate(){
        this.worker.terminate()
    }
}

export default new itworx('worker.js')