# React Hooks

The problem with react without hooks was that incase we created a functional component and we wanted to use staate 
somewhere in it we cannot do that as functional components cannot maintain state, and thus they won't re render in case 
of a state change.
With react hooks we can add state to functional components

Hooks allow you to add state to functional components and share (possibly stateful) logic accross components. 
Node :There is no relation between react hooks and lifecycle hooks, also react hooks were introduced in react 16.8.


## useState
The following class based component could be converted to functional component using react hooks like

```
import React, { Component } from 'react';

class TextView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    render() {
        return (
            <div>
                <input onChange={this.handleChange} />
                <p>{this.state.text}</p>
            </div>
        )
    }
}

export default TextView
```
To
```
import React, { useState } from 'react';
const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentState, setStateVaules ] = useState({ text: "" });
    const handleChange = (e) => {
        setStateVaules({
            text: e.target.value
        })
    }
    return (
        <div>
            <input onChange={handleChange} />
            <p>{currentState.text}</p>
        </div>
    )
}

export default TextView
```
Using hooks the state does not need to be a object, it can be a single variable like a string, and we can split the
state into multiple segments to make management of state very easy.
For example we can change the following code
 ```
 import React, { useState } from 'react';
const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentState, setStateVaules ] = useState({ name: "", password: "" });
    const handleChange = (e, type) => {
        if(type === 'name') {
            setStateVaules({
                ...currentState,
                name: e.target.value
            })
        } else {
            setStateVaules({
                ...currentState,
                password: e.target.value
            })
        }
    }
    return (
        <div>
            Enter Name: <input onChange={(e) => handleChange(e, 'name')} />
            Enter Password: <input onChange={(e) => handleChange(e, 'password')} />
            <p>{currentState.name}</p>
            <p>{currentState.password}</p>
        </div>
    )
}

export default TextView
 ```
to 
```
import React, { useState } from 'react';
const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentName, setNameVaule ] = useState("");
    const [ currentPassword, setPasswordVaule ] = useState("");
    const handleChange = (e, type) => {
        if(type === 'name') {
            setNameVaule(e.target.value)
        } else {
            setPasswordVaule(e.target.value)
        }
    }
    return (
        <div>
            Enter Name: <input onChange={(e) => handleChange(e, 'name')} />
            Enter Password: <input onChange={(e) => handleChange(e, 'password')} />
            <p>{currentName}</p>
            <p>{currentPassword}</p>
        </div>
    )
}

export default TextView
```
![https://drive.google.com/file/d/1m0wVHLtdnR7HFjYmTdeOjaxuCtxVt1nh/view](https://drive.google.com/file/d/1m0wVHLtdnR7HFjYmTdeOjaxuCtxVt1nh/view)

Hooks can only be used inside only in root of functional components or some other custom hook 

## useEffect
If we want to perform something like component did mount in a functional component we can try something like
```
import React, { useState, useEffect } from 'react';
import Axios from 'axios'
let counter = 0;
    
const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentName, setNameVaule ] = useState("");
    const [ currentPassword, setPasswordVaule ] = useState("");
    const handleChange = (e, type) => {
        if(type === 'name') {
            setNameVaule(e.target.value)
        } else {
            setPasswordVaule(e.target.value)
        }
    }
    Axios.get('/endpoint').then((res) => {
        console.log(res);
        setNameVaule(res.data + counter.toString())
        counter++;
    })
    return (
        <div>
            Enter Name: <input onChange={(e) => handleChange(e, 'name')} />
            Enter Password: <input onChange={(e) => handleChange(e, 'password')} />
            <p>{currentName}</p>
            <p>{currentPassword}</p>
        </div>
    )
}

export default TextView
```
But the following code results in an infinite loop of requests as when the component is redered the state changes and 
it is rerendered again, so to prevent this we use another hook useEffect kind of meaning use as a sideeffect
so we can move the logic inside useEffect
```
useEffect(() => {
        Axios.get('/endpoint').then((res) => {
            console.log(res);
            setNameVaule(res.data + counter.toString())
            counter++;
        })
    })
```
But this also results in an infinite loop as useEffect is called * after the component renders and each time the component
renders * . So, also infinite loop.

To preven that we have to add an empty array after the callback function, as the array denotes the dependencies of the function and the useEffect function is only called after the dependencies have changed
```
useEffect(() => {
        Axios.get('/endpoint').then((res) => {
            console.log(res);
            setNameVaule(res.data + counter.toString())
            counter++;
        })
    }, [])
```
So this is same as componentDidMount()

We can create multiple useeffects like
```
useEffect(() => {
        Axios.get('/endpoint').then((res) => {
            console.log(res);
            setNameVaule(res.data + counter.toString())
            counter++;
        })
    }, [])
useEffect(() => {
    console.log("Use effect on password changed")
}, [currentName])
```
So the second one would be called each time the value of current name changes, thus we can also use useEffect hook in place of onChange listeners, as shown in the above example. 
Note: Always mention the dependencies of the ise effect function, that is on which changes do we have to call useEffect
, it can be some props, state variables etc. Anything that is use inside the useEffect

## useRef
```
import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentName, setNameVaule ] = useState("");
    const [ currentPassword, setPasswordVaule ] = useState("");
    useEffect(() => {
        Axios.get('/endpoint').then((res) => {
            console.log(res);
        })
    }, [currentName])
    return (
        <div>
            Enter Name: <input onChange={(e) => setNameVaule(e.target.value)} />
            Enter Password: <input onChange={(e) => setPasswordVaule(e.target.value)} />
            <p>{currentName}</p>
            <p>{currentPassword}</p>
        </div>
    )
}

export default TextView
```
The following code send api requests each time the text in text box is changed, but we want to stop that, we want to hit api only when the user takes a pause for 1 second, so we can do this only if we have the  current value being typed by the user in the input field and not just the state value, and we can get that using ref hooks in react.
```
import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'

const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentName, setNameVaule ] = useState("");
    const [ currentPassword, setPasswordVaule ] = useState("");
    const inputRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if(inputRef.current.value == currentName) {
                // User has taken a pause
                Axios.get('/endpoint').then((res) => {
                    console.log(res);
                })
            }
        }, 1000)
    }, [currentName])
    return (
        <div>
            Enter Name: <input ref={inputRef} onChange={(e) => setNameVaule(e.target.value)} />
            Enter Password: <input onChange={(e) => setPasswordVaule(e.target.value)} />
            <p>{currentName}</p>
            <p>{currentPassword}</p>
        </div>
    )
}

export default TextView
```

But the problem with above code is that the ref is that the timeouts are running in background(not making api calls though) sp we have to terminate the uneeded ones, for this we make use of the return value of useEffect()), 
Use effect returns a function which runs just before the next time use effect is run, 
```
useEffect(() => {
    const timer = setTimeout(() => {
        if(inputRef.current.value == currentName) {
            // User has taken a pause
            Axios.get('/endpoint').then((res) => {
                console.log(res);
            })
        }
    }, 1000)
    return () => {
        clearTimeout(timer)
    }
}, [currentName])
```

## useReducer
We can also use a reducer as a hook to manage individual state subsets 
