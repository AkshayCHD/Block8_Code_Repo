# Node Architecture

## Node Source Code
This is how node source code actually gets things done.
The function of the v8 engine is to act as a bridge between the javascript code and c++ code so that they could communicate with one another in case some os related operation is to be performed.
V8 is used to implement and execute javascript code and libuv is used for assessing the file system and performing some aspects of concurrency.

![Structure of how a javascript function is executed by node](https://gist.githubusercontent.com/AkshayCHD/d1c65cc9d4d364b1c0a7044ea5814f19/raw/fbb49ae7de89bd7e27bab01d4d41c15522b24472/node_udemy1.png)

## Threads
A thread is a unit of instructions waiting to be executed by the CPU. Instructions are present in sequential manner inside a thread.
Two ways of improving the rate at which we process threads is to add more CPU cores, or to allow the schedular to detect big pauses in processing of a thread due to I/O  operations and execute some other thread at that time. 

## Node Event Loop
Node is often reffered to a single threaded environment (that is partially true but not completely we will cover that later) because whenever we execute a node js program, node creates a single thread to perform all the operations in that file. Inside that single thread is what we call as the event loop, we can call it a control structure that tells our single thread what it should be doing at any point in time. Every Node program has a single event loop.

To understand the functioning of the event loop we write some psuedocode to demonstrate the functioning of the event loop
```
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
```
So the above code somewhat gives is the idea of the working of the event loop.

## Is Node single threaded
Most of the people think that node is single threaded and hence it may not utilize the resouces of a system comppletely. Since all of the code is running on a single thread so it won't be able to use multiple cores of the processor which is the underutilization of resources, but it is not true.

When it comes to the event loop it is completely single threaded but there are other components of not that are not so.
As is mentioned in the diagram.
![node_single_multithreaded](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/816ee39e6f0311cd069c2d9c18ae7b7e73b2d4b3/node_single_multithreaded.png)

We can prove that node is not completly single threaded by running the following code. Here we use a inbuilt pbkdf2 function which is used to find the hash of a given input. For the given parameters it is expected to run in about 1 second.

```
const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
})
```
Output
```
1: 860
2: 882
```

If node would have been single threaded the output of one of the log would have been the double of the other. But the timings of both of the callbacks is nearly same. Hence proving that there is some aspect of node that is not single threaded.
So this is what we expected the two function to be executed if node was single threaded

![node_if_single_threaded](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/816ee39e6f0311cd069c2d9c18ae7b7e73b2d4b3/node_if_single_threaded.png)

but this is how they were actually executed

![node_actually](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/816ee39e6f0311cd069c2d9c18ae7b7e73b2d4b3/node_actually.png)

This is how the threadpool is in node.

![node_threadpool](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/816ee39e6f0311cd069c2d9c18ae7b7e73b2d4b3/node_threadpool.png)

So some computationally expensive function calls the libuv(which is another dependency of node like v8) executes the function completely outside the function loop. It uses something called a threadloop that can computationally expensive functions simultaneously outside the event loop.
By default the number of threads in a thread loop is 4. It can be demonstrated by running the following code.

```
//process.env.UV_THREADPOOL_SIZE = 5;
const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start);
})
```

Output
```
2: 886
1: 889
3: 889
4: 892
5: 1684
```
This is what happened here
![node_five_calls](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/816ee39e6f0311cd069c2d9c18ae7b7e73b2d4b3/node_five_calls.png)

The number of threads inside a threadpool can be changed by changing the env variable
```
process.env.UV_THREADPOOL_SIZE = 5;
```
All the threads in a threadpool are processed simultaneously, it is the duty of the operating system scheduler to schedule all the threads simulaneously.
So if the threadpool size is equal to five then all the five callbacks would be executed simultaneouly but the time for each callback would increase.

Output
```
2: 952
3: 1043
4: 1091
5: 1146
1: 1159
```
The diagram Illustrates this
![node_processor](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/9eccaa5eaafbe809f8544eccb09c2abe1f0e9181/node_processor_execution.png)


some faqs
![node_faq](https://gist.githubusercontent.com/AkshayCHD/faac0c93079af9cde03382f7433eef06/raw/816ee39e6f0311cd069c2d9c18ae7b7e73b2d4b3/node_faq.png)



