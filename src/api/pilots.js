import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = process.env.REACT_APP_API_URL +'/pilots';
const usePilots = () => {

const { getAccessTokenSilently } = useAuth0();

 const getAllPilots = useCallback(async() => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            }
            });
    let result = [];
    for(const x of data){
        const obj = {
            label: x.fName + " " + x.lName,
            value: x.id
        }
        result.push(obj);
    }
    return result;
    }, [getAccessTokenSilently]);

    const getPilotById = useCallback(async () => {
        const token = await getAccessTokenSilently();
        const { data } = await axios.get(`${baseUrl}/info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const register = useCallback(async () => {
        const token = await getAccessTokenSilently();
        
        const { data } = await axios.get(`${baseUrl}/register/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
        
    }, [getAccessTokenSilently]);

    const updatePilot = useCallback(async ( pilot) => {
        const token = await getAccessTokenSilently();
        await axios.put(`${baseUrl}/update`, pilot, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }, [getAccessTokenSilently]);
    return { getAllPilots, register, getPilotById, updatePilot };
}

export default usePilots;