import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";

const ListLocations = () => {
    const{ sending, error, sendRequest } = useHttp();
    const[ locations, setLocations ] = useState([]);
    const[ isLocationDeleted, setIsLocationDeleted ] = useState(false);
    const[ isStartUp, setIsStartUp ] = useState(true);
    const navigate = useNavigate();

    const deleteDataHandler = () => {
        console.log('deleteDataHandler');
        setIsLocationDeleted(true);
    };

    const deleteLocationHandler = (event, id) => {
        event.preventDefault();
        sendRequest({
            path: `/locations/${id}`,
            method: 'DELETE'
        }, deleteDataHandler);
    };

    const updateLocationHandler = (event, location) => {
        event.preventDefault();
        navigate(
            '/add-location',
            {
                state: {
                    location: location
                }
            });
    };

    useEffect(() => {
        const listDataHandler = (data) => {
            console.log('listDataHandler');
            setLocations(data);
        };

        if(isStartUp || isLocationDeleted) {
            console.log(`fetching data -> isStartUp: ${isStartUp} isLocationDeleted: ${isLocationDeleted}`);
            sendRequest({
                path: '/locations'
            }, listDataHandler);

            if(isStartUp) {
                setIsStartUp(false);
            }
            if(isLocationDeleted) {
                setIsLocationDeleted(false);
            }
            console.log('fetching completed');
        }
    }, [isStartUp, isLocationDeleted]);

    return <Fragment>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            {locations.map(location => (
                <tbody>
                    <tr>
                        <td>{location.id}</td>
                        <td>{location.code}</td>
                        <td>{location.name}</td>
                        <td>{location.type}</td>
                        <td><Link to='#' onClick={(event) => deleteLocationHandler(event, location.id)}>delete</Link></td>
                        <td><Link to='#' onClick={(event) => updateLocationHandler(event, location)}>update</Link></td>
                    </tr>
                </tbody>
            ))}
        </table>
    </Fragment>
};

export default ListLocations;