import React, { useState, useEffect, useRef } from 'react'
import './StopWatch.css'


function StopWatch() {


    const [isRunning, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTime = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current);
            }, 10);
        }

        return()=>{
            clearInterval(intervalRef.current);
        }

    }, [isRunning]);

    function start() {
        setRunning(true);
        startTime.current = Date.now() - elapsedTime;

    }

    function stop() {
        setRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setRunning(false)
    }

    function formatTime() {
       let hours =Math.floor(elapsedTime/(1000*60*60));
       let minutes =Math.floor(elapsedTime/(1000*60)%60);
       let seconds =Math.floor(elapsedTime/(1000)%60);
       let millieSeconds =Math.floor((elapsedTime%1000)/10);

       hours = String(hours).padStart(2,"0");
       minutes = String(minutes).padStart(2,"0");
       seconds = String(seconds).padStart(2,"0");
       millieSeconds = String(millieSeconds).padStart(2,"0");

        return `${hours}:${minutes}:${seconds}:${millieSeconds}`;
    }

    return (

        <>

            <div style={{ color: 'white' }} className='stopwatch'>
                <h1 style={{ color: 'deepSkyBlue', fontSize: '50px' }} >Stop Watch</h1>
                <div className="display">
                    {formatTime()}
                </div>

                <div className="controls">
                    <button onClick={start} className='start-button btn m-1 btn-success'>Start</button>
                    <button onClick={stop} className='stop-button btn m-1 btn-danger'>Stop</button>
                    <button onClick={reset} className='reset-button btn m-1 btn-warning'>Reset</button>
                </div>
            </div>

        </>
    )
}

export default StopWatch