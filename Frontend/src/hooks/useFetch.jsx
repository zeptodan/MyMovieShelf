import { useEffect, useState } from 'react';
import api from '../utilities/api';
const useFetch = (url, params = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(url,{params});
                if (res.status !== 200 || res.data.success === false) {
                    setError(`Error: ${res.statusText}`);
                    return;
                }
                setData(res.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, [url,JSON.stringify(params)]);

    return { data, error };
}
export default useFetch;