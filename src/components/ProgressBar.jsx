import { useEffect, useState } from "react";

export default function ProgressBar({timeout, onTimout}){
    const [remainingTime, setRemTime] = useState(timeout);
    
    useEffect(()=>{
        const timer = setTimeout(onTimout, timeout)
        const interval = setInterval(()=>{
            setRemTime((prevRemTime)=>prevRemTime-10)
        }, 10);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        }
    }, [onTimout, timeout])

    return <progress id='question-time' max={timeout} value={remainingTime}/>
}