import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";

const AddLocation = (props) => {
    const idRef = useRef();
    const codeRef = useRef();
    const nameRef = useRef();
    const[ type, setType ] = useState('');
    const{ sending, error, sendRequest } = useHttp();
    const[ createdId, setCreatedId ] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    //const passedLocation = (location.state !== null) ? location.state.location : null;
    const[ passedLocation, setPassedLocation ] = useState(null);

    useEffect(() => {
        if(location.state !== null) {
            console.log("state in location is not null");
            setPassedLocation(location.state.location);
            setType(location.state.location.type);
        }
        else {
            console.log("state in location is null");
            setPassedLocation(null);
            setType(null);
        }
    }, [location]);

    const typeChangeHandler = (event) => {
        setType(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        console.log("inside submit handler");
        console.log("id: " + idRef.current.value + " code: " + codeRef.current.value + " name: " + nameRef.current.value + " type: " + type);

        const payload = {
            id: idRef.current.value,
            code: codeRef.current.value,
            name: nameRef.current.value,
            type: type
        };

        console.log('from frontend' + payload);

        const dataHandler = (data) => {
            // console.log('from backend' + data);
            // console.log(data.id);
            // setCreatedId(data.id);
            console.log('from backend' + JSON.stringify(data));
            navigate('/list-locations');
        };

        sendRequest({
            path: `/locations/${location.state.location.id}`,
            method: (location.state) ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        }, dataHandler);

        // idRef.current.value = null;
        // codeRef.current.value = null;
        // nameRef.current.value = null;
        // setType('');
    }

    return <div>
        <form onSubmit={formSubmitHandler} >
            <label htmlFor='id'>Id: </label>
            <input id='id' type='number' ref={idRef} defaultValue={(passedLocation) ? passedLocation.id : null} readOnly={(passedLocation) ? true : false}/><br />
            <label htmlFor='code'>Code: </label>
            <input id='code' type='text' ref={codeRef} defaultValue={(passedLocation) ? passedLocation.code : null} /><br />
            <label htmlFor='name'>Name: </label>
            <input id='name' type='text' ref={nameRef} defaultValue={(passedLocation) ? passedLocation.name : null} /><br />
            <label>Type: </label>
            <input type="radio" id="rural" name="type" value="rural" checked={type === 'rural'} onChange={typeChangeHandler} />
            <label htmlFor="rural">Rural</label>
            <input type="radio" id="urban" name="type" value="urban" checked={type === 'urban'} onChange={typeChangeHandler} />
            <label htmlFor="urban">Urban</label><br />
            <button type="submit">Add</button>
        </form>
        {createdId !== null ? `Location is added with the id ${createdId}` : ''}
    </div>
};

export default AddLocation;