import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';



const baseUrl = process.env.REACT_APP_API_URL + '/flights';

const useFlights = () => {
    const { getAccessTokenSilently } = useAuth0();


 const getAllFlights = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/`,{
    headers: {
        Authorization: `Bearer ${token}`,
        }
    });

    return data;
    }, [getAccessTokenSilently])

 const getFlightCategoriesInfo = useCallback(async() => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/categories/`,{
        headers: {
            Authorization: `Bearer ${token}`,
            }
            });
    return data;
    }, [getAccessTokenSilently])

 const getFlightById = useCallback(async (id) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/info/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            }
            });
    return data;
    }, [getAccessTokenSilently])

 const createFlight = useCallback(async (flight) => {
    const token = await getAccessTokenSilently();
    const {status, data} = await axios.post(`${baseUrl}/`, flight, {
        headers: {
            Authorization: `Bearer ${token}`,
            }
            });
    if(status !== 200){
        throw new Error(data);
    }
    return data;
    }, [getAccessTokenSilently])

 const updateFlight = useCallback(async (flight) => {
    const token = await getAccessTokenSilently();
   
    const {status, data} = await axios.put(`${baseUrl}/update/`, flight, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if(status !== 200){
        throw new Error(data);
    }

    }, [getAccessTokenSilently])

    const getStats = useCallback(async () => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/stats/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return data;
    }, [getAccessTokenSilently])
    
    return {getAllFlights, getFlightCategoriesInfo, getFlightById, createFlight, updateFlight, getStats};
}

export default useFlights;