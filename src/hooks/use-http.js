import { useState } from "react";

const useHttp = () => {
    const[ sending, setSending ] = useState(false);
    const[ error, setError ] = useState(null);

    const sendRequest = async (requestObj, dataHandler) => {
        console.log('Sending request');
        setSending(true);
        setError(null);
        let data = null;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${requestObj.path}`, {
                method: (requestObj.method) ? requestObj.method : 'GET',
                headers: (requestObj.headers) ? requestObj.headers : {},
                body: (requestObj.body) ? JSON.stringify(requestObj.body) : null 
            });

            if(!response.ok) {
                console.log('request failed');
                throw new Error('Request failed!');
            };
            if(requestObj.method !== 'DELETE') {
                data = await response.json();
            }
            dataHandler(data);
            console.log('Successfull!');
        }
        catch(error) {
            console.log(error);
            setError(error.message || 'Something went wrong');
        }

        setSending(false);
    };

    return {
        sending,
        error,
        sendRequest
    };
};

export default useHttp;