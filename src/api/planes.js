import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = process.env.REACT_APP_API_URL + '/planes';

const usePlanes = () => {
    const { getAccessTokenSilently } = useAuth0();

 const getAllFlownPlanes = useCallback(async() => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            }
        });
    return data;
    }, [getAccessTokenSilently])

    const getPlaneByRegistration = useCallback(async (registration) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/info/${registration}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                }
                });
        return data;
        }, [getAccessTokenSilently])


    const editPlane = useCallback(async (plane) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.put(`${baseUrl}/edit/`,plane, {
            headers: {
                Authorization: `Bearer ${token}`,
                }
                });
        return data;
        }, [getAccessTokenSilently])

    return { getAllFlownPlanes, editPlane, getPlaneByRegistration };
}

export default usePlanes;