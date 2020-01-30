import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'

const TextView = () => {
    // useState returns 2 parameters, the reference to the current state and function to set the values of the states and 
    const [ currentName, setNameVaule ] = useState("");
    const [ currentPassword, setPasswordVaule ] = useState("");
    const inputRef = useRef();
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