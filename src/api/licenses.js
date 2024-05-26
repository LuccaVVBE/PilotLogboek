import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = process.env.REACT_APP_API_URL + '/licenses';

const useLicenses = () => {
    const { getAccessTokenSilently } = useAuth0();

 const getAllLicenses = useCallback(async() => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            }
        });
    return data;
    }, [getAccessTokenSilently])

 const createLicense = useCallback(async (license) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.post(`${baseUrl}/`, license, {
        headers: {
            Authorization: `Bearer ${token}`,
            }
            });
    return data;
    }, [getAccessTokenSilently])

    const deleteLicense = useCallback(async (id) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                }
                });
        return data;
        }, [getAccessTokenSilently])

    return { getAllLicenses, createLicense, deleteLicense };
}

export default useLicenses;