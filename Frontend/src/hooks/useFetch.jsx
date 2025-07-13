import { useEffect, useState } from 'react';
import api from '../utilities/api';
const useFetch = (url, params = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(url,{params});
                if (res.status !== 200) {
                    setError(`Error: ${res.statusText}`);
                    return;
                }
                setData(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, options]);

    return { data, error, loading };
}