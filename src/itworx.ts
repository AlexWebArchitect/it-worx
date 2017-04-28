
class itworx {
    
    private worker: Worker
    private subscriptions: Map<string,Function[]>
    public ver: number 

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

    public subscribe(action: string | string[], callback: Function) {

       const procedure = (action: string) => {
            const arr = this.subscriptions.has(action) 
                ? [...this.subscriptions.get(action), callback]
                : [callback]

            this.subscriptions.set(action, arr)
        }

         if(typeof action == 'string') procedure(action)
         else action.forEach( a => procedure(a))

    }

    public unsubscribe( action: string | string[], callback: Function) {

        const procedure = (action: string) => {
            if(!this.subscriptions.has(action)) return
            const arr = this.subscriptions.get(action)
                .filter(func => func!==callback)
            this.subscriptions.set(action,arr)
        }
        if(typeof action == 'string') procedure(action)
        else action.forEach( a => procedure(a))
    }

    public terminate(){
        this.worker.terminate()
    }
}

export default new itworx('worker.js')