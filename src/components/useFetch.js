import { useState, useEffect } from "react";
import BaseUrl from "./BaseURL";

const useFetch = (url, token) => {
    const [data,setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(BaseUrl + url, {
                    method: "GET",
                    signal: abortCont.signal,
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token
                    }
            })
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch data for that resource')
                }
            return res.json()
            })
            .then((data) => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch( err => {
                if(err.name !== 'AbortError'){
                    setIsPending(false)
                    setError(err.message)
                }
            })
        return () => abortCont.abort();
    }, [url, token]);

    return {data, isPending, error}
}

export default useFetch