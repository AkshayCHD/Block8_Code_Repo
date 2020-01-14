/////////////////////**********************node myFile.js******************/////////////////////
/*
The three arrays below are basically data structures that are responsible to store the different type of tasks that are 
going on during the program execution, the status of there corresponding callbacks, there type and other details.
*/ 
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

/* 
Assume that the contents of a file are being read
New tasks, timers and operations are recorded during from myFile running
*/
myFile.runContents();

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate?
    // Check two: Any pending operating system tasks? (Like server listening to a port) 
    // Check three: Any pending long running operations? (Like read from a database or fs module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

/* As soon as that happens the event loop starts that is demonstrated by this while loop
Entire body of the while loop represents one tick */
while(shouldContinue()) {
    // 1) Node looks at pendingTimers and sees if any functions are ready to be called
    
    // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
    // eg: any file is successfully read, or there is a request on our http server

    // 3) Pause execution temperarily. Continue when...
    //   - a new pendingOSTasks in done
    //   - a new pendingOperation is done
    //   - a timer is about to complete

    // 4) Look at pending timers. Call any setImmediate

    // 5) Handle any 'close' events. Like the on close of websocket connection.

}

/////////////////////*********************Exit Back to terminal******************/////////////////////
